import { SocketClient } from './../clients/socket.client';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';
import {
	Dotchi,
	DotchiDocument,
} from 'src/domain/schemas/dotchi/dotchi.schema';
import { DotchiStatistics } from 'src/domain/schemas/dotchi/dotchi-statistics.schema';
import { DotchiEnvironment } from 'src/domain/schemas/dotchi/dotchi-environment.schema';

@Injectable()
export class DotchiService {
	constructor(
		@InjectModel(Dotchi.name) private dotchiModel: Model<DotchiDocument>,
		private readonly socketClient: SocketClient,
	) { }

	get(dotchi_id: string): Promise<Dotchi> {
		return this.dotchiModel.findOne({ 'dotchi_id': dotchi_id }).exec()
	}

	getAll(): Promise<Dotchi[]> {
		return this.dotchiModel.find().exec()
	}

	post(dotchi: Dotchi): Promise<Dotchi> {
		const statistics: DotchiStatistics = { health: 100, happiness: 100 };
		const environment: DotchiEnvironment = { min_temperature: 1, max_temperature: 1, min_humidity: 1, max_humidity: 1,
		min_light_intensity: 1, max_light_intensity: 1, min_sound_intensity: 1, max_sound_intensity: 1 };
		
		dotchi = { dotchi_id: dotchi.dotchi_id, statistics: statistics, environment: environment, metrics: null };
		return this.dotchiModel.create(dotchi)
	}

	updateTemperature(metric: MetricDTO): PromiseLike<Dotchi> {
		return this.dotchiModel.findOneAndUpdate(
			{ dotchi_id: metric.dotchi_id },
			{ $set: { 'metrics.temperature': metric.value } },
			{ new: true }
		).then(dotchi => {
			this.socketClient.server.emit('updatedMetrics/' + dotchi.dotchi_id, dotchi.metrics);
			return dotchi;
		});
	}

	updateHumidity(metric: MetricDTO): PromiseLike<Dotchi> {
		return this.dotchiModel.findOneAndUpdate(
			{ dotchi_id: metric.dotchi_id },
			{ $set: { 'metrics.humidity': metric.value } },
			{ new: true }
		).then(dotchi => {
			this.socketClient.server.emit('updatedMetrics/' + dotchi.dotchi_id, dotchi.metrics);
			return dotchi;
		});
	}

	updateLightIntensity(metric: MetricDTO): PromiseLike<Dotchi> {
		return this.dotchiModel.findOneAndUpdate(
			{ dotchi_id: metric.dotchi_id },
			{ $set: { 'metrics.lightIntensity': metric.value } },
			{ new: true }
		).then(dotchi => {
			this.socketClient.server.emit('updatedMetrics/' + dotchi.dotchi_id, dotchi.metrics);
			return dotchi;
		});
	}

	updateSoundIntensity(metric: MetricDTO): PromiseLike<Dotchi> {
		return this.dotchiModel.findOneAndUpdate(
			{ dotchi_id: metric.dotchi_id },
			{ $set: { 'metrics.soundIntensity': metric.value } },
			{ new: true }
		).then(dotchi => {
			this.socketClient.server.emit('updatedMetrics/' + dotchi.dotchi_id, dotchi.metrics);
			return dotchi;
		});
	}
}
