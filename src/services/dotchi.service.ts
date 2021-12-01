import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';
import {
	Dotchi,
	DotchiDocument,
} from 'src/domain/schemas/dotchi/dotchi.schema';

@Injectable()
export class DotchiService {
	constructor(
		@InjectModel(Dotchi.name) private dotchiModel: Model<DotchiDocument>,
	) { }

	updateTemperature(metric: MetricDTO): PromiseLike<Dotchi> {
		return this.dotchiModel.findOneAndUpdate(
			{ dotchi_id: metric.dotchi_id },
			{ $set: { 'metrics.temperature': metric.value } },
			{ new: true }
		);
	}

	updateHumidity(metric: MetricDTO): PromiseLike<Dotchi> {
		return this.dotchiModel.findOneAndUpdate(
			{ dotchi_id: metric.dotchi_id },
			{ $set: { 'metrics.humidity': metric.value } },
			{ new: true }
		);
	}

	updateLightIntensity(metric: MetricDTO): PromiseLike<Dotchi> {
		return this.dotchiModel.findOneAndUpdate(
			{ dotchi_id: metric.dotchi_id },
			{ $set: { 'metrics.lightIntensity': metric.value } },
			{ new: true }
		);
	}

	updateSoundIntensity(metric: MetricDTO): PromiseLike<Dotchi> {
		return this.dotchiModel.findOneAndUpdate(
			{ dotchi_id: metric.dotchi_id },
			{ $set: { 'metrics.soundIntensity': metric.value } },
			{ new: true }
		);
	}
}
