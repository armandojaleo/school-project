import { IsOptional, IsString } from 'class-validator';

export class FindCourseDto {
  @IsOptional()
  @IsString()
  courseName?: string;

  @IsOptional()
  @IsString()
  academicYear?: string;
}
