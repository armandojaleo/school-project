import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ example: 1, description: 'The unique identifier of the role' })
  id: number;

  @Column({ nullable: true, unique: true })
  @ApiProperty({ example: 'Teacher', description: 'The name of the role' })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  @ApiProperty({ type: () => [User], description: 'The users with this role' })
  users: User[];

  @OneToMany(() => Assignment, (assignment) => assignment.role)
  @ApiProperty({
    type: () => [Assignment],
    description: 'The assignments associated with this role',
  })
  assignments: Assignment[];

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
