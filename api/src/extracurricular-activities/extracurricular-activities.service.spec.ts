import { Test, TestingModule } from '@nestjs/testing';
import { ExtracurricularActivitiesService } from './extracurricular-activities.service';

describe('ExtracurricularActivitiesService', () => {
  let service: ExtracurricularActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtracurricularActivitiesService],
    }).compile();

    service = module.get<ExtracurricularActivitiesService>(ExtracurricularActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
