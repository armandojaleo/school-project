import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolesModule } from 'src/roles/roles.module';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { UserLog } from 'src/user-logs/entities/user-log.entity';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';
import { UserLogsModule } from 'src/user-logs/user-logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserProfile, UserLog]),
    RolesModule,
    UserProfilesModule,
    UserLogsModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
