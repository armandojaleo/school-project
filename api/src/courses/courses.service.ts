import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AcademicYear } from 'src/academic-years/entities/academic-year.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(AcademicYear)
    private readonly academicYearRepository: Repository<AcademicYear>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);

    if (createCourseDto.academicYearId) {
      course.academicYear = await this.academicYearRepository.findOne({
        where: { id: createCourseDto.academicYearId },
      });
    }

    return this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findOne(id: number): Promise<Course> {
    const course = this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    return course;
  }

  async findCourseWithSubjectsByYear(
    courseId: number,
    academicYearId: number,
  ): Promise<Course> {
    const course = this.courseRepository.findOne({
      where: {
        id: courseId,
        academicYear: { id: academicYearId },
      },
      relations: ['subjects'],
    });

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    return course;
  }

  async findCoursesByNameAndYear(
    courseName?: string,
    academicYear?: string,
  ): Promise<Course[]> {
    // Si no se proporciona el nombre del curso o el año académico, devuelve un array vacío o maneja el error como prefieras
    if (!courseName && !academicYear) {
      throw new BadRequestException(
        'At least one parameter (courseName or academicYear) is required.',
      );
    }

    let academicYearEntity = null;

    // Si se proporciona el año académico, busca la entidad correspondiente
    if (academicYear) {
      academicYearEntity = await this.academicYearRepository.findOne({
        where: { year: ILike(`%${academicYear}%`) },
      });

      if (!academicYearEntity) {
        throw new NotFoundException('Academic year not found.');
      }
    }

    // Construye el objeto de búsqueda condicionalmente
    const searchConditions: any = {};
    if (courseName) {
      searchConditions.name = ILike(`%${courseName}%`);
    }
    if (academicYearEntity) {
      searchConditions.academicYear = { id: academicYearEntity.id };
    }

    const courses = await this.courseRepository.find({
      where: searchConditions,
      relations: ['subjects'],
    });

    if (courses.length === 0) {
      throw new NotFoundException('No courses found.');
    }

    return courses;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const subject = await this.courseRepository.findOne({ where: { id } });

    if (updateCourseDto.academicYearId) {
      subject.academicYear = await this.academicYearRepository.findOne({
        where: { id: updateCourseDto.academicYearId },
      });
    }

    Object.assign(subject, updateCourseDto);

    return this.courseRepository.save(subject);
  }

  async remove(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
