import { LightIntensityService } from './../../services/light-intensity.service';
import { Controller, Inject } from '@nestjs/common';
import {
	ClientMqtt,
	Ctx,
	MessagePattern,
	MqttContext,
	Payload,
} from '@nestjs/microservices'
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';

@Controller()
export class LightIntensityMqttController {
	constructor(
		@Inject('MQTT_CLIENT') private client: ClientMqtt,
		private readonly lightIntensityService: LightIntensityService,
	) { }

	@MessagePattern('lightIntensity')
	update(@Payload() metric: MetricDTO, @Ctx() context: MqttContext) {
		this.lightIntensityService.update(metric);
	}
}
