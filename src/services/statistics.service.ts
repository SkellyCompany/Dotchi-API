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
  private readonly happinesChangeStep = 0.1;
  private readonly happinesDeltaTreshold = 10;
  private readonly healthChangeStep = 0.1;
  private readonly statisticCheckInterval = 3000;

  constructor(
    @InjectModel(Dotchi.name) private dotchiModel: Model<DotchiDocument>,
    private readonly socketClient: SocketClient,
    private readonly dotchiService: DotchiService,
  ) {
    setInterval(() => {
      this.updateStatistics();
    }, this.statisticCheckInterval);
  }

  updateStatistics() {
    this.dotchiService.getAll().then((dotchis) => {
      var happinessValue = 0;
      var healthValue = 0;
      for (let i = 0; i < dotchis.length; i++) {
        if (dotchis[i].metrics) {
          if (dotchis[i].metrics.temperature) {
            if (
              dotchis[i].metrics.temperature <
              dotchis[i].environment.min_temperature ||
              dotchis[i].metrics.temperature >
              dotchis[i].environment.max_temperature
            ) {
              happinessValue -= this.happinesChangeStep;
              healthValue -= this.healthChangeStep;
            } else if (
              dotchis[i].metrics.temperature <
              dotchis[i].environment.min_temperature + this.happinesDeltaTreshold ||
              dotchis[i].metrics.temperature >
              dotchis[i].environment.max_temperature - this.happinesDeltaTreshold
            ) {
              happinessValue -= this.happinesChangeStep;
              healthValue += this.healthChangeStep
            } else {
              happinessValue += this.happinesChangeStep;
              healthValue += this.healthChangeStep
            }
          }
          if (dotchis[i].metrics.humidity) {
            if (
              dotchis[i].metrics.humidity <
              dotchis[i].environment.min_humidity ||
              dotchis[i].metrics.humidity >
              dotchis[i].environment.max_humidity
            ) {
              happinessValue -= this.happinesChangeStep;
              healthValue -= this.healthChangeStep;
            } else if (
              dotchis[i].metrics.humidity <
              dotchis[i].environment.min_humidity + this.happinesDeltaTreshold ||
              dotchis[i].metrics.humidity >
              dotchis[i].environment.max_humidity - this.happinesDeltaTreshold
            ) {
              happinessValue -= this.happinesChangeStep;
              healthValue += this.healthChangeStep
            } else {
              happinessValue += this.happinesChangeStep;
              healthValue += this.healthChangeStep
            }
          }
          if (dotchis[i].metrics.sound_intensity) {
            if (
              dotchis[i].metrics.sound_intensity <
              dotchis[i].environment.min_sound_intensity ||
              dotchis[i].metrics.sound_intensity >
              dotchis[i].environment.max_sound_intensity
            ) {
              happinessValue -= this.happinesChangeStep;
              healthValue -= this.healthChangeStep;
            } else if (
              dotchis[i].metrics.sound_intensity <
              dotchis[i].environment.min_sound_intensity + this.happinesDeltaTreshold ||
              dotchis[i].metrics.sound_intensity >
              dotchis[i].environment.max_sound_intensity - this.happinesDeltaTreshold
            ) {
              happinessValue -= this.happinesChangeStep;
              healthValue += this.healthChangeStep
            } else {
              happinessValue += this.happinesChangeStep;
              healthValue += this.healthChangeStep
            }
          }
          if (dotchis[i].metrics.light_intensity) {
            if (
              dotchis[i].metrics.light_intensity <
              dotchis[i].environment.min_light_intensity ||
              dotchis[i].metrics.light_intensity >
              dotchis[i].environment.max_light_intensity
            ) {
              happinessValue -= this.happinesChangeStep;
              healthValue -= this.healthChangeStep;
            } else if (
              dotchis[i].metrics.light_intensity <
              dotchis[i].environment.min_light_intensity + this.happinesDeltaTreshold ||
              dotchis[i].metrics.light_intensity >
              dotchis[i].environment.max_light_intensity - this.happinesDeltaTreshold
            ) {
              happinessValue -= this.happinesChangeStep;
              healthValue += this.healthChangeStep
            } else {
              happinessValue += this.happinesChangeStep;
              healthValue += this.healthChangeStep
            }
          }
        }

        if (happinessValue < 0) {
          if (dotchis[i].statistics.happiness < Math.abs(happinessValue)) {
            happinessValue = -dotchis[i].statistics.happiness;
          }
        } else if (happinessValue > 0) {
          if (dotchis[i].statistics.happiness + happinessValue > 100) {
            happinessValue = 100 - dotchis[i].statistics.happiness;
          }
        }

        if (healthValue < 0) {
          if (dotchis[i].statistics.health < Math.abs(healthValue)) {
            healthValue = -dotchis[i].statistics.health;
          }
        } else if (healthValue > 0) {
          if (dotchis[i].statistics.health + healthValue > 100) {
            healthValue = 100 - dotchis[i].statistics.health;
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
