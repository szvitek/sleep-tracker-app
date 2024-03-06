import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Sleep, SleepSchema } from "./schemas/sleep.schema";
import { SleepController } from "./sleep.controller";
import { SleepService } from "./sleep.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Sleep.name, schema: SleepSchema }])],
  controllers: [SleepController],
  providers: [SleepService],
})
export class SleepModule {}
