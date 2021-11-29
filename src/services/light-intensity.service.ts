import { Injectable } from '@nestjs/common';
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';

@Injectable()
export class LightIntensityService {
    update(lightMetric: MetricDTO) {
        //Save to database
        console.log(lightMetric);
    }
}
