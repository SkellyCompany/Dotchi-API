import { Injectable } from '@nestjs/common';
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';

@Injectable()
export class HumidityService {
  update(humidityMetric: MetricDTO) {
    //Save to database
    console.log();
  }
}
