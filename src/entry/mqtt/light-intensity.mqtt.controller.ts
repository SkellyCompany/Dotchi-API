import { DotchiService } from './../../services/dotchi.service';
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
		private readonly dotchiService: DotchiService,
	) { }

	@MessagePattern('lightIntensity')
	update(@Payload() metric: MetricDTO, @Ctx() context: MqttContext) {
		console.log("LIGHT")
		this.dotchiService.updateLightIntensity(metric);
	}
}
