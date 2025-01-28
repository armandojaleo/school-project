import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from 'src/schools/entities/school.entity';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { AcademicYear } from 'src/academic-years/entities/academic-year.entity';
import { ExtracurricularActivity } from 'src/extracurricular-activities/entities/extracurricular-activity.entity';
import { SchoolsController } from 'src/schools/schools.controller';
import { SchoolsService } from 'src/schools/schools.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      School, 
      User, 
      Course, 
      AcademicYear, 
      ExtracurricularActivity,
    ]),
  ],
  providers: [SchoolsService],
  controllers: [SchoolsController],
})
export class SchoolsModule {}
