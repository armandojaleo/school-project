import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicYearsModule } from 'src/academic-years/academic-years.module';
import { AssignmentsModule } from 'src/assignments/assignments.module';
import { CoursesModule } from 'src/courses/courses.module';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';
import { ExtracurricularActivitiesModule } from 'src/extracurricular-activities/extracurricular-activities.module';
import { GradesModule } from 'src/grades/grades.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { PaymentStatusesModule } from 'src/payment-statuses/payment-statuses.module';
import { RolesModule } from 'src/roles/roles.module';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { UsersModule } from 'src/users/users.module';
import { AcademicYear } from 'src/academic-years/entities/academic-year.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import { ExtracurricularActivity } from 'src/extracurricular-activities/entities/extracurricular-activity.entity';
import { Grade } from 'src/grades/entities/grade.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { PaymentStatus } from 'src/payment-statuses/entities/payment-status.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';
import { UserLogsModule } from 'src/user-logs/user-logs.module';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { UserLog } from 'src/user-logs/entities/user-log.entity';
import { SchoolsModule } from 'src/schools/schools.module';
import { School } from 'src/schools/entities/school.entity';

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
        School,
        Subject,
        User,
        UserProfile,
        UserLog,
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
    SchoolsModule,
    SubjectsModule,
    UsersModule,
    UserProfilesModule,
    UserLogsModule,
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply to all routes, or specify routes
  // }
}
