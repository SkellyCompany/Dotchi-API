import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';
import { Dotchi, DotchiDocument } from 'src/domain/schemas/dotchi/dotchi.schema';

@Injectable()
export class HumidityService {
  constructor(
		@InjectModel(Dotchi.name) private dotchiModel: Model<DotchiDocument>
	) { }

  update(humidityMetric: MetricDTO) {
    this.dotchiModel.findOneAndUpdate(
      { dotchi_id: humidityMetric.dotchi_id },
      { $set: { 'metrics.humidity.value': humidityMetric.value } },
      { new: true },
      function (err, model) {
        if (err) {
          console.log('Error when updating humidity of Dotchi with ID: ' + humidityMetric.dotchi_id);
        }
      },
    );
  }
}
