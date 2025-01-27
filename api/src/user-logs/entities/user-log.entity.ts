import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity('user_logs')
export class UserLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.logs) // Relación con la entidad User
  user: User;

  @Column({ type: 'date', nullable: true })
  log_date: Date;

  @Column({ nullable: true })
  note_content: string;

  @Column({ type: 'time', nullable: true })
  entry_time: string;

  @Column({ type: 'time', nullable: true })
  exit_time: string;

  @Column({ nullable: true })
  authorization_note: string;

  @Column({ nullable: true })
  justification: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
