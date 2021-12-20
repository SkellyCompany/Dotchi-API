import { MetricsService } from '../../services/metrics.service';
import { MetricDTO } from '../../domain/dtos/metric/metric.dto';
import { Controller, Inject } from '@nestjs/common';
import {
	ClientMqtt,
	Ctx,
	MessagePattern,
	MqttContext,
	Payload,
} from '@nestjs/microservices'

@Controller()
export class MetricsMqttController {
	constructor(
		@Inject('MQTT_CLIENT') private client: ClientMqtt,
		private readonly metricsService: MetricsService
	) { }

	@MessagePattern('temperature')
	updateTemperature(@Payload() metric: MetricDTO, @Ctx() context: MqttContext) {
		this.metricsService.updateTemperature(metric);
	}

	@MessagePattern('humidity')
	updateHumidity(@Payload() metric: MetricDTO, @Ctx() context: MqttContext) {
		this.metricsService.updateHumidity(metric);
	}

	@MessagePattern('lightIntensity')
	updateLighIntensity(@Payload() metric: MetricDTO, @Ctx() context: MqttContext) {
		this.metricsService.updateLightIntensity(metric);
	}

	@MessagePattern('soundIntensity')
	updateSoundIntensity(@Payload() metric: MetricDTO, @Ctx() context: MqttContext) {
		this.metricsService.updateSoundIntensity(metric);
	}
}
