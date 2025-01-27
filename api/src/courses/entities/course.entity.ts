import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AcademicYear } from 'src/academic-years/entities/academic-year.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import { ExtracurricularActivity } from 'src/extracurricular-activities/entities/extracurricular-activity.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the course',
  })
  id: number;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'Mathematics',
    description: 'The name of the course',
  })
  name: string;

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.courses)
  @JoinColumn({ name: 'academic_year_id' })
  @ApiProperty({
    type: () => AcademicYear,
    description: 'The academic year this course belongs to',
  })
  academicYear: AcademicYear;

  @OneToMany(() => Assignment, (assignment) => assignment.course)
  @ApiProperty({
    type: () => [Assignment],
    description: 'The assignments associated with the course',
  })
  assignments: Assignment[];

  @OneToMany(() => Subject, (subject) => subject.course)
  @ApiProperty({
    type: () => [Subject],
    description: 'The subjects associated with the course',
  })
  subjects: Subject[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  @ApiProperty({
    type: () => [Enrollment],
    description: 'The enrollments associated with the course',
  })
  enrollments: Enrollment[];

  @OneToMany(() => ExtracurricularActivity, (activity) => activity.course)
  @ApiProperty({
    type: () => [ExtracurricularActivity],
    description: 'The extracurricular activities associated with the course',
  })
  extracurricularActivities: ExtracurricularActivity[];

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Creation date of the user',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Last update date of the user',
  })
  updatedAt: Date;
}
