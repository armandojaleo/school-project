import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { AcademicYear } from './entities/academic-year.entity';

@Injectable()
export class AcademicYearsService {
  constructor(
    @InjectRepository(AcademicYear)
    private readonly academicYearRepository: Repository<AcademicYear>,
  ) {}

  // Método para crear un nuevo AcademicYear en la base de datos
  async create(
    createAcademicYearDto: CreateAcademicYearDto,
  ): Promise<AcademicYear> {
    const academicYear = this.academicYearRepository.create(
      createAcademicYearDto,
    );
    return this.academicYearRepository.save(academicYear);
  }

  // Método para obtener todos los AcademicYears
  async findAll(): Promise<AcademicYear[]> {
    return this.academicYearRepository.find();
  }

  // Método para obtener un AcademicYear por su ID
  async findOne(id: number): Promise<AcademicYear> {
    return this.academicYearRepository.findOne({ where: { id } });
  }

  // Método para actualizar un AcademicYear existente
  async update(
    id: number,
    updateAcademicYearDto: UpdateAcademicYearDto,
  ): Promise<AcademicYear> {
    await this.academicYearRepository.update(id, updateAcademicYearDto);
    return this.findOne(id); // Retorna el registro actualizado
  }

  // Método para eliminar un AcademicYear por su ID
  async remove(id: number): Promise<void> {
    await this.academicYearRepository.delete(id);
  }
}
