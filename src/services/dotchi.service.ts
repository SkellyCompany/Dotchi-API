import { CreateDotchiDTO } from './../domain/dtos/dotchi/create-dotchi.dto';
import { LogService } from './log.service';
import { SocketClient } from './../clients/socket.client';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Dotchi,
  DotchiDocument,
} from 'src/domain/schemas/dotchi/dotchi.schema';
import { DotchiStatistics } from 'src/domain/schemas/dotchi/dotchi-statistics.schema';
import { DotchiEnvironment } from 'src/domain/schemas/dotchi/dotchi-environment.schema';

@Injectable()
export class DotchiService {
  constructor(
    @InjectModel(Dotchi.name) private dotchiModel: Model<DotchiDocument>,
    private readonly socketClient: SocketClient,
    private readonly logService: LogService
  ) { }

  get(dotchi_id: string): Promise<Dotchi> {
    return this.dotchiModel.findOne({ dotchi_id: dotchi_id }).exec();
  }

  getByMother(id: string): Promise<Dotchi> {
    return this.dotchiModel.findOne({ mother_id: id }).exec();
  }

  getAll(): Promise<Dotchi[]> {
    return this.dotchiModel.find().exec();
  }

  post(dto: CreateDotchiDTO): Promise<Dotchi> {
    function random(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min) + min);
    }

    const statistics: DotchiStatistics = { health: 100, happiness: 100 };
    const environment: DotchiEnvironment = {
      min_temperature: random(0, 10),
      max_temperature: random(30, 40),
      min_humidity: random(30, 40),
      max_humidity: random(70, 80),
      min_light_intensity: random(15, 25),
      max_light_intensity: random(70, 80),
      min_sound_intensity: random(25, 30),
      max_sound_intensity: random(60, 70),
    };

    const dotchi = {
      dotchi_id: dto.dotchi_id,
      mother_id: dto.mother_id,
      statistics: statistics,
      environment: environment,
      metrics: {},
    };
    return this.dotchiModel.create(dotchi);
  }
}
