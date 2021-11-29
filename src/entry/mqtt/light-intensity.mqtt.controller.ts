import { Controller, Inject } from '@nestjs/common';
import {
	ClientMqtt,
	Ctx,
	MessagePattern,
	MqttContext,
	Payload,
} from '@nestjs/microservices'

@Controller()
export class LightIntensityMqttController {
	constructor(
		@Inject('MQTT_CLIENT') private client: ClientMqtt
	) { }

	@MessagePattern('lightIntensity')
	lightIntensityUpdate(@Payload() data: any, @Ctx() context: MqttContext) {
		console.log(data);
	}
}
