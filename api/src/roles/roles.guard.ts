import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    // Si no hay roles requeridos, entonces el acceso ya está permitido por el AuthGuard
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Verifica si el usuario tiene uno de los roles requeridos
    const hasRole = () => user.role && requiredRoles.includes(user.role);
    if (!user || !hasRole()) {
      throw new ForbiddenException();
    }

    return true;
  }
}
