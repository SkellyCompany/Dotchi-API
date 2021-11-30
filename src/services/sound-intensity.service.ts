import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';
import {
  Dotchi,
  DotchiDocument,
} from 'src/domain/schemas/dotchi/dotchi.schema';

@Injectable()
export class SoundIntensityService {
  constructor(
    @InjectModel(Dotchi.name) private dotchiModel: Model<DotchiDocument>,
  ) {}

  update(soundMetric: MetricDTO) {
    this.dotchiModel.findOneAndUpdate(
      { dotchi_id: soundMetric.dotchi_id },
      { $set: { 'metrics.sound_intensity.value': soundMetric.value } },
      { new: true },
      function (err, model) {
        if (err) {
          console.log('Error when updating sound of Dotchi with ID: ' + soundMetric.dotchi_id);
        }
      },
    );
  }
}