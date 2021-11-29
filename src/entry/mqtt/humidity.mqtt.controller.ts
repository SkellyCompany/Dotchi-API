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
		@Inject('MQTT_CLIENT') private client: ClientMqtt
	) { }

	@MessagePattern('humidity')
	update(@Payload() data: any, @Ctx() context: MqttContext) {
		console.log(data);
	}
}
