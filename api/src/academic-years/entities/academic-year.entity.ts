import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from 'src/courses/entities/course.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { School } from 'src/schools/entities/school.entity';

@Entity('academic_years')
export class AcademicYear {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the academic year',
  })
  id: number;

  @Column({ nullable: true })
  @ApiProperty({ example: '2023-2024', description: 'The academic year' })
  year: string;

  @OneToMany(() => Subject, (subject) => subject.academicYear)
  @ApiProperty({
    type: () => [Subject],
    description: 'The subjects associated with the academic year',
  })
  subjects: Subject[];

  @OneToMany(() => Course, (course) => course.academicYear)
  @ApiProperty({
    type: () => [Course],
    description: 'The courses associated with the academic year',
  })
  courses: Course[];

  @ManyToOne(() => School, (school) => school.academicYears)
  school: School;

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
