import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'admin@school.test',
    description: 'Email of the user',
  })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  password: string;
}
