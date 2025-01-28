import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from 'src/courses/entities/course.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { School } from 'src/schools/entities/school.entity';

@Entity('extracurricular_activities')
export class ExtracurricularActivity {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the activity',
  })
  id: number;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'Field Trip',
    description: 'The name of the activity',
  })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'A trip to the science museum',
    description: 'Description of the activity',
  })
  description: string;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({
    example: '2024-06-01',
    description: 'The date of the activity',
  })
  date: Date;

  @Column({ type: 'numeric', nullable: true })
  @ApiProperty({ example: 50.0, description: 'The cost of the activity' })
  cost: number;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({
    example: '2024-06-01',
    description: 'The start date of the activity',
  })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({
    example: '2024-06-01',
    description: 'The end date of the activity',
  })
  end_date: Date;

  @ManyToOne(() => Course, (course) => course.extracurricularActivities)
  @JoinColumn({ name: 'course_id' })
  @ApiProperty({
    type: () => Course,
    description: 'The course associated with the activity',
  })
  course: Course;

  @OneToMany(() => Payment, (payment) => payment.activity)
  @ApiProperty({
    type: () => [Payment],
    description: 'The payments associated with this activity',
  })
  payments: Payment[];

  @ManyToMany(() => School, (school) => school.extracurricularActivities)
  schools: School[];

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
