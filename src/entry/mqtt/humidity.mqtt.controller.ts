import { DotchiService } from './../../services/dotchi.service';
import { MetricDTO } from './../../domain/dtos/metric/metric.dto';
import { Controller, Inject } from '@nestjs/common';
import {
	ClientMqtt,
	Ctx,
	MessagePattern,
	MqttContext,
	Payload,
} from '@nestjs/microservices'

@Controller()
export class HumidityMqttController {
	constructor(
		@Inject('MQTT_CLIENT') private client: ClientMqtt,
		private readonly dotchiService: DotchiService,
	) { }

	@MessagePattern('humidity')
	update(@Payload() metric: MetricDTO, @Ctx() context: MqttContext) {
		this.dotchiService.updateHumidity(metric);
	}
}
