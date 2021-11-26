import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class DotchiMetrics {
	@Prop()
	temperature: number;

	@Prop()
	humidity: number;

	@Prop()
	light_intensity: number;

	@Prop()
	sound_intensity: number;
}

export const DotchiMetricsSchema = SchemaFactory.createForClass(DotchiMetrics);
