import { Controller, Inject } from '@nestjs/common';
import {
	ClientMqtt,
	Ctx,
	MessagePattern,
	MqttContext,
	Payload,
} from '@nestjs/microservices'
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';
import { TemperatureService } from 'src/services/temperature.service';

@Controller()
export class TemperatureMqttController {
	constructor(
		@Inject('MQTT_CLIENT') private client: ClientMqtt,
		private readonly temperatureService: TemperatureService,
	) { }

	@MessagePattern('temperature')
	update(@Payload() metric: MetricDTO, @Ctx() context: MqttContext) {
		this.temperatureService.update(metric);
	}
}
