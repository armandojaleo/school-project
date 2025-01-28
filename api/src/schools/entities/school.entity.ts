import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { AcademicYear } from 'src/academic-years/entities/academic-year.entity';
import { ExtracurricularActivity } from 'src/extracurricular-activities/entities/extracurricular-activity.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('schools')
export class School {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the school',
  })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({
    example: 'Colegio Público Madrid',
    description: 'Name of the school',
  })
  name: string;

  @Column({ length: 255 })
  @ApiProperty({
    example: 'Calle Mayor, 123, Madrid, España',
    description: 'Address of the school',
  })
  address: string;

  @Column({ length: 15 })
  @ApiProperty({
    example: '+34 912345678',
    description: 'Phone number of the school',
  })
  phone: string;

  @Column({ length: 100 })
  @ApiProperty({
    example: 'info@colegiopublicomadrid.es',
    description: 'Email address of the school',
  })
  email: string;

  @Column({ length: 100 })
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Name of the school principal',
  })
  principal: string;

  @Column({ type: 'int' })
  @ApiProperty({
    example: 500,
    description: 'Maximum capacity of students in the school',
  })
  studentCapacity: number;

  @Column({ length: 20 })
  @ApiProperty({
    example: 'Public',
    description: 'Type of the school (e.g., Public, Private, Semi-private)',
  })
  type: string;

  @Column({ length: 100 })
  @ApiProperty({
    example: 'Primary',
    description: 'Educational level of the school (e.g., Primary, Secondary, High School)',
  })
  educationalLevel: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Creation date of the school',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2024-01-01T12:00:00Z',
    description: 'Last update date of the school',
  })
  updatedAt: Date;

  // Relationships
  @OneToMany(() => User, (user) => user.school)
  @ApiProperty({
    type: () => [User],
    description: 'List of users associated with the school',
  })
  users: User[];

  @OneToMany(() => Course, (course) => course.school)
  @ApiProperty({
    type: () => [Course],
    description: 'List of courses offered by the school',
  })
  courses: Course[];

  @OneToMany(() => AcademicYear, (academicYear) => academicYear.school)
  @ApiProperty({
    type: () => [AcademicYear],
    description: 'List of academic years managed by the school',
  })
  academicYears: AcademicYear[];

  @ManyToMany(() => ExtracurricularActivity, (activity) => activity.schools)
  @JoinTable()
  @ApiProperty({
    type: () => [ExtracurricularActivity],
    description: 'List of extracurricular activities available at the school',
  })
  extracurricularActivities: ExtracurricularActivity[];
}
