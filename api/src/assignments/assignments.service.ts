import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { CreateAssignmentDto } from 'src/assignments/dto/create-assignment.dto';
import { User } from 'src/users/entities/user.entity';
import { School } from 'src/schools/entities/school.entity';
import { Role } from 'src/roles/entities/role.entity';
import { AcademicYear } from 'src/academic-years/entities/academic-year.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(AcademicYear)
    private readonly academicYearRepository: Repository<AcademicYear>,
  ) {}

  // Crear una nueva asignación
  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const { userId, schoolId, roleId, academicYearId, startDate, endDate } = createAssignmentDto;

    // Buscar el usuario
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Buscar la escuela
    const school = await this.schoolRepository.findOne({ where: { id: schoolId } });
    if (!school) {
      throw new NotFoundException(`School with ID ${schoolId} not found`);
    }

    // Buscar el rol
    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    // Buscar el año académico
    const academicYear = await this.academicYearRepository.findOne({ where: { id: academicYearId } });
    if (!academicYear) {
      throw new NotFoundException(`Academic Year with ID ${academicYearId} not found`);
    }

    // Crear y guardar la asignación
    const assignment = this.assignmentRepository.create({
      user,
      school,
      role,
      academicYear,
      startDate,
      endDate,
    });

    return await this.assignmentRepository.save(assignment);
  }

  // Obtener todas las asignaciones
  async findAll(): Promise<Assignment[]> {
    return await this.assignmentRepository.find({
      relations: ['user', 'school', 'role', 'academic-year'],
    });
  }

  // Obtener una asignación por ID
  async findOne(id: number): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
      relations: ['user', 'school', 'role', 'academic-year'],
    });
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return assignment;
  }

  // Actualizar una asignación
  async update(id: number, updateAssignmentDto: Partial<CreateAssignmentDto>): Promise<Assignment> {
    const assignment = await this.findOne(id);

    Object.assign(assignment, updateAssignmentDto);

    return await this.assignmentRepository.save(assignment);
  }

  // Eliminar una asignación
  async remove(id: number): Promise<void> {
    const assignment = await this.findOne(id);
    await this.assignmentRepository.remove(assignment);
  }
}
