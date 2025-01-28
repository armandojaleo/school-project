import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
  ) {}

  async findAll(): Promise<School[]> {
    return await this.schoolRepository.find({
      relations: ['users', 'courses', 'academic-years', 'extracurricular-activities'],
    });
  }

  async findOne(id: number): Promise<School> {
    return await this.schoolRepository.findOne({
      where: { id },
      relations: ['users', 'courses', 'academic-years', 'extracurricular-activities'],
    });
  }

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    // Crea una nueva instancia de la escuela
    const school = this.schoolRepository.create(createSchoolDto);

    // Guarda la nueva escuela en la base de datos
    return await this.schoolRepository.save(school);
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    // Prepara la actualización de la entidad
    const school = await this.schoolRepository.preload({
      id,
      ...updateSchoolDto,
    });

    if (!school) {
      throw new Error(`School with ID ${id} not found`);
    }

    // Guarda los cambios en la base de datos
    return await this.schoolRepository.save(school);
  }

  async remove(id: number): Promise<void> {
    const school = await this.schoolRepository.findOneBy({ id });

    if (!school) {
      throw new Error(`School with ID ${id} not found`);
    }

    await this.schoolRepository.remove(school);
  }
}
