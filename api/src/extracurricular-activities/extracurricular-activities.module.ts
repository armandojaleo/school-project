import { Module } from '@nestjs/common';
import { ExtracurricularActivitiesService } from './extracurricular-activities.service';
import { ExtracurricularActivitiesController } from './extracurricular-activities.controller';

@Module({
  controllers: [ExtracurricularActivitiesController],
  providers: [ExtracurricularActivitiesService],
})
export class ExtracurricularActivitiesModule {}
