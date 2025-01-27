import { Test, TestingModule } from '@nestjs/testing';
import { ExtracurricularActivitiesController } from './extracurricular-activities.controller';
import { ExtracurricularActivitiesService } from './extracurricular-activities.service';

describe('ExtracurricularActivitiesController', () => {
  let controller: ExtracurricularActivitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtracurricularActivitiesController],
      providers: [ExtracurricularActivitiesService],
    }).compile();

    controller = module.get<ExtracurricularActivitiesController>(ExtracurricularActivitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
