import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Course } from 'src/courses/entities/course.entity';
import { AcademicYear } from 'src/academic-years/entities/academic-year.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Course, AcademicYear])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
