import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { RolesGuard } from 'src/roles/roles.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // Aplicar AuthGuard globalmente
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Aplicar RolesGuard globalmente
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
