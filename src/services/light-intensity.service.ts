import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';
import { Dotchi, DotchiDocument } from 'src/domain/schemas/dotchi/dotchi.schema';

@Injectable()
export class LightIntensityService {
    constructor(
		@InjectModel(Dotchi.name) private dotchiModel: Model<DotchiDocument>
	) { }

  update(lightMetric: MetricDTO) {
    this.dotchiModel.findOneAndUpdate(
      { dotchi_id: lightMetric.dotchi_id },
      { $set: { 'metrics.light_intensity.value': lightMetric.value } },
      { new: true },
      function (err, model) {
        if (err) {
          console.log('Error when updating light of Dotchi with ID: ' + lightMetric.dotchi_id);
        }
      },
    );
  }
}