import { Injectable } from '@nestjs/common';
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';

@Injectable()
export class SoundIntensityService {
    update(soundIntensityMetric: MetricDTO) {
        //Save to database
        console.log(soundIntensityMetric);
    }
}
