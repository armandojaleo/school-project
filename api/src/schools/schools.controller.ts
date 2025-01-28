import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SchoolsService } from 'src/schools/schools.service';
import { School } from 'src/schools/entities/school.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateSchoolDto } from 'src/schools/dto/create-school.dto';
import { UpdateSchoolDto } from 'src/schools/dto/update-school.dto';

@ApiTags('schools')
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Get()
  findAll(): Promise<School[]> {
    return this.schoolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<School> {
    return this.schoolsService.findOne(id);
  }

  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolsService.update(id, updateSchoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.schoolsService.remove(id);
  }
}
