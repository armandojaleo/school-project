import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.profile) // Relación con la entidad User
  user: User;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  biography: string;

  @Column({ nullable: true })
  identifier: string;

  @Column({ nullable: true })
  health_card: string;

  @Column({ nullable: true })
  allergies: string;

  @Column({ nullable: true })
  vaccinations: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
