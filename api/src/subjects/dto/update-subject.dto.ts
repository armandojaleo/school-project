import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectDto } from './create-subject.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
  @ApiPropertyOptional({
    example: 'Mathematics',
    description: 'The name of the subject',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Advanced Mathematics Course',
    description: 'The description of the subject',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'Educational program details',
    description: 'The educational program for the subject',
  })
  @IsOptional()
  @IsString()
  educationalProgram?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'The ID of the course this subject belongs to',
  })
  @IsOptional()
  @IsNumber()
  courseId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'The ID of the academic year this subject belongs to',
  })
  @IsOptional()
  @IsNumber()
  academicYearId?: number;
}
