import { Controller, Get } from '@nestjs/common';
import { HumidityService } from 'src/services/humidity.service';
import { TemperatureService } from 'src/services/temperature.service';
import { AppService } from '../../services/app.service';
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';
import { LightIntensityService } from 'src/services/light-intensity.service';
import { SoundIntensityService } from 'src/services/sound-intensity.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly soundService: SoundIntensityService, private readonly lightService: LightIntensityService, private readonly humidityService: HumidityService, private readonly temperatureService: TemperatureService) { }

  @Get()
  getHello(): string {
    const metric: MetricDTO = {dotchi_id: "C4:5B:BE:8C:60:F0", value: 666}
    this.temperatureService.update(metric);
    this.humidityService.update(metric);
    this.lightService.update(metric);
    this.soundService.update(metric);
    return this.appService.getHello();
  }
}
