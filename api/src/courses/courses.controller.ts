import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindCourseDto } from './dto/find-course.dto';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search for a course by name and academic year' })
  @ApiQuery({
    name: 'courseName',
    type: 'string',
    description: 'Name of the course',
  })
  @ApiQuery({
    name: 'academicYear',
    type: 'string',
    description: 'Year of the academic year',
  })
  findCourseByNameAndYear(@Query() query: FindCourseDto) {
    const { courseName, academicYear } = query;
    if (!courseName || !academicYear) {
      throw new BadRequestException(
        'Course name and academic year are required.',
      );
    }

    return this.coursesService.findCoursesByNameAndYear(
      courseName,
      academicYear,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException('Invalid course ID');
    }
    return this.coursesService.findOne(+id);
  }

  @Get(':courseId/year/:academicYearId')
  @ApiOperation({
    summary: 'Get course with subjects for a specific academic year',
  })
  @ApiParam({
    name: 'courseId',
    type: 'number',
    description: 'ID of the course',
  })
  @ApiParam({
    name: 'academicYearId',
    type: 'number',
    description: 'ID of the academic year',
  })
  findCourseWithSubjectsByYear(
    @Param('courseId') courseId: number,
    @Param('academicYearId') academicYearId: number,
  ) {
    if (isNaN(courseId) || isNaN(academicYearId)) {
      throw new BadRequestException('Invalid course ID or academic year ID');
    }
    return this.coursesService.findCourseWithSubjectsByYear(
      courseId,
      academicYearId,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
