import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicYearsModule } from './academic-years/academic-years.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { ExtracurricularActivitiesModule } from './extracurricular-activities/extracurricular-activities.module';
import { GradesModule } from './grades/grades.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentStatusesModule } from './payment-statuses/payment-statuses.module';
import { RolesModule } from './roles/roles.module';
import { SubjectsModule } from './subjects/subjects.module';
import { UsersModule } from './users/users.module';
import { AcademicYear } from './academic-years/entities/academic-year.entity';
import { Assignment } from './assignments/entities/assignment.entity';
import { Course } from './courses/entities/course.entity';
import { Enrollment } from './enrollments/entities/enrollment.entity';
import { ExtracurricularActivity } from './extracurricular-activities/entities/extracurricular-activity.entity';
import { Grade } from './grades/entities/grade.entity';
import { Payment } from './payments/entities/payment.entity';
import { PaymentStatus } from './payment-statuses/entities/payment-status.entity';
import { Role } from './roles/entities/role.entity';
import { Subject } from './subjects/entities/subject.entity';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';
import { UserLogsModule } from './user-logs/user-logs.module';
import { UserProfile } from './user-profiles/entities/user-profile.entity';
import { UserLog } from './user-logs/entities/user-log.entity';
import { SchoolsModule } from './schools/schools.module';
import { School } from './schools/entities/school.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'password',
      username: 'postgres',
      entities: [
        AcademicYear,
        Assignment,
        Course,
        Enrollment,
        ExtracurricularActivity,
        Grade,
        Payment,
        PaymentStatus,
        Role,
        Subject,
        User,
        UserProfile,
        UserLog,
        School,
      ],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    AcademicYearsModule,
    AssignmentsModule,
    CoursesModule,
    EnrollmentsModule,
    ExtracurricularActivitiesModule,
    GradesModule,
    PaymentsModule,
    PaymentStatusesModule,
    RolesModule,
    SubjectsModule,
    UsersModule,
    UserProfilesModule,
    UserLogsModule,
    SchoolsModule,
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply to all routes, or specify routes
  // }
}
