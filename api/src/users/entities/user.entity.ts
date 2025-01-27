import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/entities/role.entity';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Grade } from 'src/grades/entities/grade.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { UserLog } from 'src/user-logs/entities/user-log.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  id: number;

  @Column({ name: 'first_name', nullable: true })
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  lastName: string;

  @Column({ nullable: true, unique: true })
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'strongpassword',
    description: 'The password of the user',
  })
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  @ApiProperty({ type: () => Role, description: 'The role of the user' })
  role: Role;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  @ApiProperty({
    type: () => [Enrollment],
    description: 'The enrollments associated with the user',
  })
  enrollments: Enrollment[];

  @OneToMany(() => Assignment, (assignment) => assignment.user)
  @ApiProperty({
    type: () => [Assignment],
    description: 'The assignments associated with the user',
  })
  assignments: Assignment[];

  @OneToMany(() => Grade, (grade) => grade.user)
  @ApiProperty({
    type: () => [Grade],
    description: 'The grades associated with the user',
  })
  grades: Grade[];

  @OneToMany(() => Payment, (payment) => payment.user)
  @ApiProperty({
    type: () => [Payment],
    description: 'The payments associated with the user',
  })
  payments: Payment[];

  @OneToOne(() => UserProfile, (profile) => profile.user) // Relación con user_profiles
  @JoinColumn()
  profile: UserProfile;

  @OneToMany(() => UserLog, (log) => log.user) // Relación con user_logs
  logs: UserLog[];

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
