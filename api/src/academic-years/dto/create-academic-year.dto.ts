import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAcademicYearDto {
  @ApiProperty({ example: '2023-2024', description: 'The academic year' })
  @IsString()
  year: string;
}
