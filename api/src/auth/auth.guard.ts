import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request.user = payload; // Adjuntar el payload al request

      // Obtener los roles requeridos del decorador
      const requiredRoles = this.reflector.get<string[]>(
        'roles',
        context.getHandler(),
      );

      // Si no hay roles requeridos, permitir acceso si el rol es 'Admin'
      if (!requiredRoles) {
        if (request.user.role !== 'Admin') {
          throw new ForbiddenException(`Access denied. Admin role required.`);
        }
      } else {
        // Verificar si el rol del usuario está en los roles requeridos
        const hasRole = () => requiredRoles.includes(request.user.role);
        if (!hasRole()) {
          throw new ForbiddenException(
            `Access denied. Role required: ${requiredRoles.join(', ')}`,
          );
        }
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
