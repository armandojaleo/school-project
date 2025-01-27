import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';

@Entity('grades')
export class Grade {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the grade',
  })
  id: number;

  @ManyToOne(() => User, (user) => user.grades)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    type: () => User,
    description: 'The user who received the grade',
  })
  user: User;

  @Column({ type: 'numeric', nullable: true })
  @ApiProperty({ example: 95.5, description: 'The grade received by the user' })
  grade: number;

  @ManyToOne(() => Subject, (subject) => subject.grades)
  @JoinColumn({ name: 'subject_id' })
  @ApiProperty({
    type: () => Subject,
    description: 'The subject the grade is for',
  })
  subject: Subject;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.grades)
  @JoinColumn({ name: 'enrollment_id' })
  @ApiProperty({
    type: () => Enrollment,
    description: 'The enrollment associated with the grade',
  })
  enrollment: Enrollment;

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
