import { Injectable } from '@nestjs/common';
import { CreateExtracurricularActivityDto } from './dto/create-extracurricular-activity.dto';
import { UpdateExtracurricularActivityDto } from './dto/update-extracurricular-activity.dto';

@Injectable()
export class ExtracurricularActivitiesService {
  create(createExtracurricularActivityDto: CreateExtracurricularActivityDto) {
    return 'This action adds a new extracurricularActivity';
  }

  findAll() {
    return `This action returns all extracurricularActivities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} extracurricularActivity`;
  }

  update(
    id: number,
    updateExtracurricularActivityDto: UpdateExtracurricularActivityDto,
  ) {
    return `This action updates a #${id} extracurricularActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} extracurricularActivity`;
  }
}
