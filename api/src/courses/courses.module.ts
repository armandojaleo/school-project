import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { AcademicYear } from 'src/academic-years/entities/academic-year.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, AcademicYear])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
