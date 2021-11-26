import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class DotchiEnvironment {
	@Prop()
	min_temperature: number;

	@Prop()
	max_temperature: number;

	@Prop()
	min_humidity: number;

	@Prop()
	max_humidity: number;

	@Prop()
	min_light_intensity: number;

	@Prop()
	max_light_intensity: number;

	@Prop()
	min_sound_intensity: number;

	@Prop()
	max_sound_intensity: number;
}

export const DotchiEnvironmentSchema = SchemaFactory.createForClass(DotchiEnvironment);
