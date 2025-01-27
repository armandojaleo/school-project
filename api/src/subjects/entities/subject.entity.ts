import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from 'src/courses/entities/course.entity';
import { AcademicYear } from 'src/academic-years/entities/academic-year.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Grade } from 'src/grades/entities/grade.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the subject',
  })
  id: number;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Physics', description: 'The name of the subject' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'Advanced Physics Course',
    description: 'The description of the subject',
  })
  description: string;

  @Column({ name: 'educational_program', nullable: true })
  @ApiProperty({
    example: 'Educational program details',
    description: 'The educational program for the subject',
  })
  educationalProgram: string;

  @ManyToOne(() => Course, (course) => course.subjects)
  @JoinColumn({ name: 'course_id' })
  @ApiProperty({
    type: () => Course,
    description: 'The course the subject belongs to',
  })
  course: Course;

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.subjects)
  @JoinColumn({ name: 'academic_year_id' })
  @ApiProperty({
    type: () => AcademicYear,
    description: 'The academic year the subject belongs to',
  })
  academicYear: AcademicYear;

  @OneToMany(() => Assignment, (assignment) => assignment.subject)
  @ApiProperty({
    type: () => [Assignment],
    description: 'The assignments associated with the subject',
  })
  assignments: Assignment[];

  @OneToMany(() => Grade, (grade) => grade.subject)
  @ApiProperty({
    type: () => [Grade],
    description: 'The grades associated with the subject',
  })
  grades: Grade[];

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
