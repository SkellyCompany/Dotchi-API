import { Controller, Inject } from '@nestjs/common';
import {
	ClientMqtt,
	Ctx,
	MessagePattern,
	MqttContext,
	Payload,
} from '@nestjs/microservices'

@Controller()
export class TemperatureMqttController {
	constructor(
		@Inject('MQTT_CLIENT') private client: ClientMqtt
	) { }

	@MessagePattern('temperature')
	temperatureUpdate(@Payload() data: any, @Ctx() context: MqttContext) {
		console.log(data); console.log(data);
	}
}
