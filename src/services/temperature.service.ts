import { Injectable } from '@nestjs/common';
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';

@Injectable()
export class TemperatureService {
    update(temperatureMetric: MetricDTO) {
        //Save to database
        console.log(temperatureMetric);
    }
}
