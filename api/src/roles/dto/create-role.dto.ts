import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'The name of the role',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
