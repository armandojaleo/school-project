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
import { Course } from 'src/courses/entities/course.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the assignment',
  })
  id: number;

  @ManyToOne(() => User, (user) => user.assignments)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: () => User, description: 'The user assigned' })
  user: User;

  @ManyToOne(() => Subject, (subject) => subject.assignments)
  @JoinColumn({ name: 'subject_id' })
  @ApiProperty({ type: () => Subject, description: 'The subject assigned' })
  subject: Subject;

  @ManyToOne(() => Course, (course) => course.assignments)
  @JoinColumn({ name: 'course_id' })
  @ApiProperty({ type: () => Course, description: 'The course assigned' })
  course: Course;

  @ManyToOne(() => Role, (role) => role.assignments)
  @JoinColumn({ name: 'role_id' })
  @ApiProperty({ type: () => Role, description: 'The role assigned' })
  role: Role;

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
