import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SleepDocument = HydratedDocument<Sleep>;

@Schema()
export class Sleep {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['Male', 'Female', 'Other'] })
  gender: string;

  @Prop({ required: true, min: 0, max: 24 })
  duration: number;

  @Prop({ default: new Date() })
  date: Date;
}

export const SleepSchema = SchemaFactory.createForClass(Sleep);
