import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocketClient } from 'src/clients/socket.client';
import {
  Dotchi,
  DotchiDocument,
} from 'src/domain/schemas/dotchi/dotchi.schema';
import { DotchiService } from './dotchi.service';

@Injectable()
export class StatisticsService {
  private readonly statisticsDecreaseStat = 0.1;

  constructor(
    @InjectModel(Dotchi.name) private dotchiModel: Model<DotchiDocument>,
    private readonly socketClient: SocketClient,
    private readonly dotchiService: DotchiService,
  ) {
    setInterval(() => {
      this.updateStatistics();
    }, 3 * 1000);
  }

  updateStatistics() {
    this.dotchiService.getAll().then((dotchis) => {
      var happinessValue = 0;
      for (let i = 0; i < dotchis.length; i++) {
        if (dotchis[i].metrics) {
          if (dotchis[i].metrics.temperature) {
            if (
              dotchis[i].metrics.temperature <
                dotchis[i].environment.min_temperature ||
              dotchis[i].metrics.temperature >
                dotchis[i].environment.max_temperature
            ) {
              happinessValue -= this.statisticsDecreaseStat;
            } else {
              happinessValue += this.statisticsDecreaseStat;
            }
          }
          if (dotchis[i].metrics.humidity) {
            if (
              dotchis[i].metrics.humidity <
                dotchis[i].environment.min_humidity ||
              dotchis[i].metrics.humidity > dotchis[i].environment.max_humidity
            ) {
              happinessValue -= this.statisticsDecreaseStat;
            } else {
              happinessValue += this.statisticsDecreaseStat;
            }
          }
          if (dotchis[i].metrics.sound_intensity) {
            if (
              dotchis[i].metrics.sound_intensity <
                dotchis[i].environment.min_sound_intensity ||
              dotchis[i].metrics.sound_intensity >
                dotchis[i].environment.max_sound_intensity
            ) {
              happinessValue -= this.statisticsDecreaseStat;
            } else {
              happinessValue += this.statisticsDecreaseStat;
            }
          }
          if (dotchis[i].metrics.light_intensity) {
            if (
              dotchis[i].metrics.light_intensity <
                dotchis[i].environment.min_light_intensity ||
              dotchis[i].metrics.light_intensity >
                dotchis[i].environment.max_light_intensity
            ) {
              happinessValue -= this.statisticsDecreaseStat;
            } else {
              happinessValue += this.statisticsDecreaseStat;
            }
          }
        }
        
        this.dotchiModel
          .findOneAndUpdate(
            { dotchi_id: dotchis[i].dotchi_id },
            {
              $set: {
                'statistics.happiness':
                  dotchis[i].statistics.happiness + happinessValue,
              },
            },
            { new: true },
          )
          .then((dotchi) => {
            this.socketClient.server.emit(
              'updatedStatistics/' + dotchi.dotchi_id,
              dotchi.statistics,
            );
            return dotchi;
          });
      }
    });
  }
}
