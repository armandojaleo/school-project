import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, roleName } = createUserDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Buscar el rol asociado
    const role = await this.rolesService.findByName(roleName);
    if (!role) {
      throw new NotFoundException(`Role with name "${roleName}" not found`);
    }

    // Encriptar la contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      role,
    });
    return this.userRepository.save(newUser);
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['role'] });
  }

  // Obtener un usuario por ID
  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${email} not found`);
    }
    return user;
  }

  // Actualizar un usuario
  async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(email);

    if (updateUserDto.password) {
      // Encriptar la nueva contraseña si se proporciona
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (updateUserDto.roleName) {
      // Actualizar el rol si se proporciona
      const role = await this.rolesService.findByName(updateUserDto.roleName);
      if (!role) {
        throw new NotFoundException(
          `Role with name "${updateUserDto.roleName}" not found`,
        );
      }
      user.role = role;
    }

    // Actualizar los campos del usuario
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  // Eliminar un usuario
  async remove(email: string): Promise<void> {
    const user = await this.findOne(email);
    await this.userRepository.remove(user);
  }
}
