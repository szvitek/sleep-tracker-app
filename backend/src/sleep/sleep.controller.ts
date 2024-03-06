import { Body, Controller, Get, Post } from '@nestjs/common';
import { SleepService } from './sleep.service';
import { CreateSleepDto } from './dto/create-sleep.dto';
import { Sleep } from './schemas/sleep.schema';

@Controller('/api/sleeps')
export class SleepController {
  constructor(private readonly sleepService: SleepService) {}

  @Get('/seed')
  async seedDatabase() {
    return this.sleepService.seed();
  }

  @Post()
  async create(@Body() createSleepDto: CreateSleepDto) {
    console.log('post', createSleepDto);
    return this.sleepService.create(createSleepDto);
  }

  @Get()
  async findAll(): Promise<Sleep[]> {
    return this.sleepService.findAll();
  }
}
