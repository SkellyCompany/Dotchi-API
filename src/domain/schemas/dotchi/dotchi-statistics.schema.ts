import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class DotchiStatistics {
	@Prop()
	health: number;

	@Prop()
	happiness: number;
}

export const DotchiStatisticsSchema = SchemaFactory.createForClass(DotchiStatistics);
