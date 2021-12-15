import { LogService } from './log.service';
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
import { LogDTO } from 'src/domain/dtos/log/log.dto';

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

  getAll(): Promise<Dotchi[]> {
    return this.dotchiModel.find().exec();
  }

  post(id: string): Promise<Dotchi> {
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
      dotchi_id: id,
      statistics: statistics,
      environment: environment,
      metrics: {},
    };
    return this.dotchiModel.create(dotchi).then((dotchi) => {
      const log: LogDTO = {
        dotchi_id: dotchi.dotchi_id,
        name: "Dotchi was born",
        description: "It's a happy day, it's a celebration!",
        timestamp: new Date().getSeconds(),
        parameters: new Map<string, any>([
          ["dotchi", dotchi]
        ])
      }
      this.logService.create(log)
      return dotchi
    });
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
      })
      .then((dotchi) => {
        const log: LogDTO = {
          dotchi_id: dotchi.dotchi_id,
          name: "Metrics changed",
          description: "Dotchi's metrics were changed based on its environment",
          timestamp: new Date().getSeconds(),
          parameters: new Map<string, any>([
            ["metrics", dotchi.metrics]
          ])
        }
        this.logService.create(log)
        return dotchi
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
      })
      .then((dotchi) => {
        const log: LogDTO = {
          dotchi_id: dotchi.dotchi_id,
          name: "Metrics changed",
          description: "Dotchi's metrics were changed based on its environment",
          timestamp: new Date().getSeconds(),
          parameters: new Map<string, any>([
            ["metrics", dotchi.metrics]
          ])
        }
        this.logService.create(log)
        return dotchi
      });
  }

  updateLightIntensity(metric: MetricDTO): PromiseLike<Dotchi> {
    return this.dotchiModel
      .findOneAndUpdate(
        { dotchi_id: metric.dotchi_id },
        { $set: { 'metrics.light_intensity': metric.value } },
        { new: true },
      )
      .then((dotchi) => {
        this.socketClient.server.emit(
          'updatedMetrics/' + dotchi.dotchi_id,
          dotchi.metrics,
        );
        return dotchi;
      })
      .then((dotchi) => {
        const log: LogDTO = {
          dotchi_id: dotchi.dotchi_id,
          name: "Metrics changed",
          description: "Dotchi's metrics were changed based on its environment",
          timestamp: new Date().getSeconds(),
          parameters: new Map<string, any>([
            ["metrics", dotchi.metrics]
          ])
        }
        this.logService.create(log)
        return dotchi
      });
  }

  updateSoundIntensity(metric: MetricDTO): PromiseLike<Dotchi> {
    return this.dotchiModel
      .findOneAndUpdate(
        { dotchi_id: metric.dotchi_id },
        { $set: { 'metrics.sound_intensity': metric.value } },
        { new: true },
      )
      .then((dotchi) => {
        this.socketClient.server.emit(
          'updatedMetrics/' + dotchi.dotchi_id,
          dotchi.metrics,
        );
        return dotchi;
      })
      .then((dotchi) => {
        const log: LogDTO = {
          dotchi_id: dotchi.dotchi_id,
          name: "Metrics changed",
          description: "Dotchi's metrics were changed based on its environment",
          timestamp: new Date().getSeconds(),
          parameters: new Map<string, any>([
            ["metrics", dotchi.metrics]
          ])
        }
        this.logService.create(log)
        return dotchi
      });
  }
}
