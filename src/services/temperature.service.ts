import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';
import {
  Dotchi,
  DotchiDocument,
} from 'src/domain/schemas/dotchi/dotchi.schema';

@Injectable()
export class TemperatureService {
  constructor(
    @InjectModel(Dotchi.name) private dotchiModel: Model<DotchiDocument>,
  ) {}

  update(temperatureMetric: MetricDTO) {
    this.dotchiModel.findOneAndUpdate(
      { dotchi_id: temperatureMetric.dotchi_id },
      { $set: { 'metrics.temperature.value': temperatureMetric.value } },
      { new: true },
      function (err, model) {
        if (err) {
          console.log('Error when updating temperature of Dotchi with ID: ' + temperatureMetric.dotchi_id);
        }
      },
    );
  }
}
