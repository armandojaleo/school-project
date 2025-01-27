import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    example: 'Mathematics',
    description: 'The name of the subject',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Advanced Mathematics Course',
    description: 'The description of the subject',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'Educational program details',
    description: 'The educational program for the subject',
  })
  @IsOptional()
  @IsString()
  educationalProgram?: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the course this subject belongs to',
  })
  @IsOptional()
  @IsNumber()
  courseId?: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the academic year this subject belongs to',
  })
  @IsOptional()
  @IsNumber()
  academicYearId?: number;
}
