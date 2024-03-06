import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateSleepDto } from './dto/create-sleep.dto';
import { Sleep } from './schemas/sleep.schema';

@Injectable()
export class SleepService {
  constructor(@InjectModel(Sleep.name) private sleepModel: Model<Sleep>) {}

  async create(createSleepDto: CreateSleepDto): Promise<Sleep> {
    const createdSleep = new this.sleepModel(createSleepDto);
    return createdSleep.save();
  }

  async findAll(): Promise<Sleep[]> {
    return this.sleepModel.find().exec();
  }
}
