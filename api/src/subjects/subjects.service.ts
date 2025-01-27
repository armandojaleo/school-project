import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Course } from 'src/courses/entities/course.entity';
import { AcademicYear } from 'src/academic-years/entities/academic-year.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(AcademicYear)
    private readonly academicYearRepository: Repository<AcademicYear>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const subject = this.subjectRepository.create(createSubjectDto);

    if (createSubjectDto.courseId) {
      subject.course = await this.courseRepository.findOne({
        where: { id: createSubjectDto.courseId },
      });
    }

    if (createSubjectDto.academicYearId) {
      subject.academicYear = await this.academicYearRepository.findOne({
        where: { id: createSubjectDto.academicYearId },
      });
    }

    return this.subjectRepository.save(subject);
  }

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }

  async findOne(id: number): Promise<Subject> {
    return this.subjectRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({ where: { id } });

    if (updateSubjectDto.courseId) {
      subject.course = await this.courseRepository.findOne({
        where: { id: updateSubjectDto.courseId },
      });
    }

    if (updateSubjectDto.academicYearId) {
      subject.academicYear = await this.academicYearRepository.findOne({
        where: { id: updateSubjectDto.academicYearId },
      });
    }

    Object.assign(subject, updateSubjectDto);

    return this.subjectRepository.save(subject);
  }

  async remove(id: number): Promise<void> {
    await this.subjectRepository.delete(id);
  }
}
