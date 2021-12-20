import { LogService } from './log.service';
import { SocketClient } from './../clients/socket.client';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';
import {
	Dotchi,
	DotchiDocument,
} from 'src/domain/schemas/dotchi/dotchi.schema';
import { LogDTO } from 'src/domain/dtos/log/log.dto';

@Injectable()
export class MetricsService {
	constructor(
		@InjectModel(Dotchi.name) private dotchiModel: Model<DotchiDocument>,
		private readonly socketClient: SocketClient,
		private readonly logService: LogService
	) { }

	updateTemperature(metric: MetricDTO): PromiseLike<Dotchi> {
		return this.dotchiModel
			.findOneAndUpdate(
				{ dotchi_id: metric.dotchi_id },
				{ $set: { 'metrics.temperature': metric.value } },
				{ new: true },
			)
			.then((dotchi) => {
				this.socketClient.server.emit(
					'updatedMetrics/' + dotchi.dotchi_id,
					dotchi.metrics,
				);
				return dotchi;
			})
			.then((dotchi) => {
				const log: LogDTO = {
					dotchi_id: dotchi.dotchi_id,
					name: "Metrics changed",
					description: "Dotchi's metrics were changed based on its environment",
					timestamp: Math.floor(Date.now() / 1000),
					parameters: new Map<string, any>([
						["metrics", dotchi.metrics]
					])
				}
				this.logService.create(log)
				return dotchi
			});
	}

	updateHumidity(metric: MetricDTO): PromiseLike<Dotchi> {
		return this.dotchiModel
			.findOneAndUpdate(
				{ dotchi_id: metric.dotchi_id },
				{ $set: { 'metrics.humidity': metric.value } },
				{ new: true },
			)
			.then((dotchi) => {
				this.socketClient.server.emit(
					'updatedMetrics/' + dotchi.dotchi_id,
					dotchi.metrics,
				);
				return dotchi;
			})
			.then((dotchi) => {
				const log: LogDTO = {
					dotchi_id: dotchi.dotchi_id,
					name: "Metrics changed",
					description: "Dotchi's metrics were changed based on its environment",
					timestamp: Math.floor(Date.now() / 1000),
					parameters: new Map<string, any>([
						["metrics", dotchi.metrics]
					])
				}
				this.logService.create(log)
				return dotchi
			});
	}

	updateLightIntensity(metric: MetricDTO): PromiseLike<Dotchi> {
		return this.dotchiModel
			.findOneAndUpdate(
				{ dotchi_id: metric.dotchi_id },
				{ $set: { 'metrics.light_intensity': metric.value } },
				{ new: true },
			)
			.then((dotchi) => {
				this.socketClient.server.emit(
					'updatedMetrics/' + dotchi.dotchi_id,
					dotchi.metrics,
				);
				return dotchi;
			})
			.then((dotchi) => {
				const log: LogDTO = {
					dotchi_id: dotchi.dotchi_id,
					name: "Metrics changed",
					description: "Dotchi's metrics were changed based on its environment",
					timestamp: Math.floor(Date.now() / 1000),
					parameters: new Map<string, any>([
						["metrics", dotchi.metrics]
					])
				}
				this.logService.create(log)
				return dotchi
			});
	}

	updateSoundIntensity(metric: MetricDTO): PromiseLike<Dotchi> {
		return this.dotchiModel
			.findOneAndUpdate(
				{ dotchi_id: metric.dotchi_id },
				{ $set: { 'metrics.sound_intensity': metric.value } },
				{ new: true },
			)
			.then((dotchi) => {
				this.socketClient.server.emit(
					'updatedMetrics/' + dotchi.dotchi_id,
					dotchi.metrics,
				);
				return dotchi;
			})
			.then((dotchi) => {
				const log: LogDTO = {
					dotchi_id: dotchi.dotchi_id,
					name: "Metrics changed",
					description: "Dotchi's metrics were changed based on its environment",
					timestamp: Math.floor(Date.now() / 1000),
					parameters: new Map<string, any>([
						["metrics", dotchi.metrics]
					])
				}
				this.logService.create(log)
				return dotchi
			});
	}
}
