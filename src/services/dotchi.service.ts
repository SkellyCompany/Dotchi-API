import { SocketClient } from './../clients/socket.client';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';
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
  ) {}

  get(dotchi_id: string): Promise<Dotchi> {
    return this.dotchiModel.findOne({ dotchi_id: dotchi_id }).exec();
  }

  getAll(): Promise<Dotchi[]> {
    return this.dotchiModel.find().exec();
  }

  post(dotchi: Dotchi): Promise<Dotchi> {
    const statistics: DotchiStatistics = { health: 100, happiness: 100 };
    const min_temperature = this.random(0, 10);
    const max_temperature = this.random(30, 40);
    const min_humidity = this.random(30, 40);
    const max_humidity = this.random(70, 80);
    const min_light_intensity = this.random(15, 25);
    const max_light_intensity = this.random(70, 80);
    const min_sound_intensity = this.random(25, 30);
    const max_sound_intensity = this.random(60, 70);

    const environment: DotchiEnvironment = {
      min_temperature: min_temperature,
      max_temperature: max_temperature,
      min_humidity: min_humidity,
      max_humidity: max_humidity,
      min_light_intensity: min_light_intensity,
      max_light_intensity: max_light_intensity,
      min_sound_intensity: min_sound_intensity,
      max_sound_intensity: max_sound_intensity,
    };

    dotchi = {
      dotchi_id: dotchi.dotchi_id,
      statistics: statistics,
      environment: environment,
      metrics: null,
    };
    return this.dotchiModel.create(dotchi);
  }

  random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  updateTemperature(metric: MetricDTO): PromiseLike<Dotchi> {
    return this.dotchiModel
      .findOneAndUpdate(
        { dotchi_id: metric.dotchi_id },
        { $set: { 'metrics.temperature': metric.value } },
        { new: true },
      )
      .then((dotchi) => {
        this.socketClient.server.emit(
          'updatedMetrics/' + dotchi.dotchi_id,
          dotchi.metrics,
        );
        return dotchi;
      });
  }

  updateHumidity(metric: MetricDTO): PromiseLike<Dotchi> {
    return this.dotchiModel
      .findOneAndUpdate(
        { dotchi_id: metric.dotchi_id },
        { $set: { 'metrics.humidity': metric.value } },
        { new: true },
      )
      .then((dotchi) => {
        this.socketClient.server.emit(
          'updatedMetrics/' + dotchi.dotchi_id,
          dotchi.metrics,
        );
        return dotchi;
      });
  }

  updateLightIntensity(metric: MetricDTO): PromiseLike<Dotchi> {
    return this.dotchiModel
      .findOneAndUpdate(
        { dotchi_id: metric.dotchi_id },
        { $set: { 'metrics.lightIntensity': metric.value } },
        { new: true },
      )
      .then((dotchi) => {
        this.socketClient.server.emit(
          'updatedMetrics/' + dotchi.dotchi_id,
          dotchi.metrics,
        );
        return dotchi;
      });
  }

  updateSoundIntensity(metric: MetricDTO): PromiseLike<Dotchi> {
    return this.dotchiModel
      .findOneAndUpdate(
        { dotchi_id: metric.dotchi_id },
        { $set: { 'metrics.soundIntensity': metric.value } },
        { new: true },
      )
      .then((dotchi) => {
        this.socketClient.server.emit(
          'updatedMetrics/' + dotchi.dotchi_id,
          dotchi.metrics,
        );
        return dotchi;
      });
  }
}
