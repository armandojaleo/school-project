import { IsString, IsEmail, IsInt, Length, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty({
    example: 'School Test',
    description: 'Name of the school',
  })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({
    example: '123 Main Street, City, Country',
    description: 'Address of the school',
  })
  @IsString()
  @Length(1, 255)
  address: string;

  @ApiProperty({
    example: '+1 123456789',
    description: 'Phone number of the school',
  })
  @IsString()
  @Length(1, 15)
  phone: string;

  @ApiProperty({
    example: 'info@schooltest.com',
    description: 'Email address of the school',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the school principal',
  })
  @IsString()
  @Length(1, 100)
  principal: string;

  @ApiProperty({
    example: 500,
    description: 'Maximum capacity of students in the school',
  })
  @IsInt()
  @Min(1)
  @Max(10000)
  studentCapacity: number;

  @ApiProperty({
    example: 'Public',
    description: 'Type of the school (e.g., Public, Private, Semi-private)',
  })
  @IsString()
  @Length(1, 20)
  type: string;

  @ApiProperty({
    example: 'Primary',
    description: 'Educational level of the school (e.g., Primary, Secondary, High School)',
  })
  @IsString()
  @Length(1, 100)
  educationalLevel: string;
}
