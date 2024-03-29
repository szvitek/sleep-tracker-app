import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateSleepDto } from './dto/create-sleep.dto';
import { Sleep } from './schemas/sleep.schema';

@Injectable()
export class SleepService {
  constructor(@InjectModel(Sleep.name) private sleepModel: Model<Sleep>) {}

  async seed(): Promise<Sleep[]> {
    const users = [
      { name: 'Debi', gender: 'Female' },
      { name: 'Lydia', gender: 'Female' },
      { name: 'Kimberly', gender: 'Female' },
      { name: 'Benjamin', gender: 'Male' },
      { name: 'Daniel', gender: 'Male' },
      { name: 'Rainbow', gender: 'Other' },
    ];

    const data = [];

    users.forEach((user) => {
      for (let i = 0; i < 10; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (i + 1));
        data.push({
          name: user.name,
          gender: user.gender,
          duration: Math.floor(Math.random() * 9) + 3,
          date: date,
        });
      }
    });

    return this.sleepModel.create(data);
  }

  async create(createSleepDto: CreateSleepDto): Promise<Sleep> {
    const createdSleep = new this.sleepModel(createSleepDto);
    return createdSleep.save();
  }

  async findAll(): Promise<Sleep[]> {
    return this.sleepModel
      .aggregate([
        {
          $group: {
            _id: { name: '$name', gender: '$gender' },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.name': 1 } },
      ])
      .exec();
  }

  async findByName(name: string): Promise<Sleep[]> {
    const today = new Date();

    return this.sleepModel
      .find({
        name,
        date: { $gte: new Date(today.setDate(today.getDate() - 8)) },
      })
      .sort({ date: -1 })
      .exec();
  }
}
