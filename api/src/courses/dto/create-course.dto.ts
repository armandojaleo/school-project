import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    example: 'Physics 101',
    description: 'The name of the course',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the academic year this course belongs to',
  })
  @IsOptional()
  @IsNumber()
  academicYearId?: number;
}
