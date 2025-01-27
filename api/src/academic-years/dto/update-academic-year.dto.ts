import { PartialType } from '@nestjs/mapped-types';
import { CreateAcademicYearDto } from './create-academic-year.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateAcademicYearDto extends PartialType(CreateAcademicYearDto) {
  @ApiPropertyOptional({
    example: '2023-2024',
    description: 'The academic year',
  })
  @IsString()
  year?: string;
}
