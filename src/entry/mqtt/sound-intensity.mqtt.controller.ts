import { SoundIntensityService } from './../../services/sound-intensity.service';
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
export class SoundIntensityMqttController {
	constructor(
		@Inject('MQTT_CLIENT') private client: ClientMqtt,
		private readonly soundIntensityService: SoundIntensityService,
	) { }

	@MessagePattern('soundIntensity')
	update(@Payload() metric: MetricDTO, @Ctx() context: MqttContext) {
		this.soundIntensityService.update(metric);
	}
}
