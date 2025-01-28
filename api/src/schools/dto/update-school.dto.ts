import { PartialType } from '@nestjs/mapped-types';
import { CreateSchoolDto } from './create-school.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSchoolDto extends PartialType(CreateSchoolDto) {
  @ApiPropertyOptional({
    example: 'Updated School Name',
    description: 'Updated name of the school',
  })
  name?: string;

  @ApiPropertyOptional({
    example: '456 New Street, City, Country',
    description: 'Updated address of the school',
  })
  address?: string;

  @ApiPropertyOptional({
    example: '+1 987654321',
    description: 'Updated phone number of the school',
  })
  phone?: string;

  @ApiPropertyOptional({
    example: 'admin@schooltest.com',
    description: 'Updated email address of the school',
  })
  email?: string;

  @ApiPropertyOptional({
    example: 'Jane Smith',
    description: 'Updated name of the school principal',
  })
  principal?: string;

  @ApiPropertyOptional({
    example: 600,
    description: 'Updated maximum capacity of students in the school',
  })
  studentCapacity?: number;

  @ApiPropertyOptional({
    example: 'Private',
    description: 'Updated type of the school (e.g., Public, Private, Semi-private)',
  })
  type?: string;

  @ApiPropertyOptional({
    example: 'High School',
    description: 'Updated educational level of the school',
  })
  educationalLevel?: string;
}
