import { Injectable } from '@nestjs/common';
import { Dotchi } from 'src/domain/schemas/dotchi/dotchi.schema';
import { DotchiService } from './dotchi.service';

@Injectable()
export class Statisticservice {
  constructor(private readonly dotchiService: DotchiService) {
    setInterval(() => {
      this.checkMetrics();
    }, 1 * 1000);
  }

  checkMetrics() {
    this.dotchiService.getAll().then((dotchis) => {
      for (let i = 0; i < dotchis.length; i++) {
        // if (
        //   dotchis[i].metrics.temperature <
        //     dotchis[i].environment.min_temperature ||
        //   dotchis[i].metrics.temperature >
        //     dotchis[i].environment.max_temperature
        // ) {

        // }
        // if (
        //   dotchis[i].metrics.humidity < dotchis[i].environment.min_humidity ||
        //   dotchis[i].metrics.humidity > dotchis[i].environment.max_humidity
        // ) {

        // }
        // if (
        //   dotchis[i].metrics.sound_intensity <
        //     dotchis[i].environment.min_sound_intensity ||
        //   dotchis[i].metrics.sound_intensity >
        //     dotchis[i].environment.max_sound_intensity
        // ) {

        // }
        // if (
        //   dotchis[i].metrics.light_intensity <
        //     dotchis[i].environment.min_light_intensity ||
        //   dotchis[i].metrics.light_intensity >
        //     dotchis[i].environment.max_light_intensity
        // ) {

        // }
      }
    });
  }
}
