import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExtracurricularActivitiesService } from './extracurricular-activities.service';
import { CreateExtracurricularActivityDto } from './dto/create-extracurricular-activity.dto';
import { UpdateExtracurricularActivityDto } from './dto/update-extracurricular-activity.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('extracurricular-activities')
@Controller('extracurricular-activities')
export class ExtracurricularActivitiesController {
  constructor(
    private readonly extracurricularActivitiesService: ExtracurricularActivitiesService,
  ) {}

  @Post()
  create(
    @Body() createExtracurricularActivityDto: CreateExtracurricularActivityDto,
  ) {
    return this.extracurricularActivitiesService.create(
      createExtracurricularActivityDto,
    );
  }

  @Get()
  findAll() {
    return this.extracurricularActivitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extracurricularActivitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExtracurricularActivityDto: UpdateExtracurricularActivityDto,
  ) {
    return this.extracurricularActivitiesService.update(
      +id,
      updateExtracurricularActivityDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extracurricularActivitiesService.remove(+id);
  }
}
