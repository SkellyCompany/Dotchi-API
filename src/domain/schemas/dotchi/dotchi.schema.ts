import { DotchiEnvironment, DotchiEnvironmentSchema } from './dotchi-environment.schema';
import { DotchiMetrics, DotchiMetricsSchema } from './dotchi-metrics.schema';
import { DotchiStatistics, DotchiStatisticsSchema } from './dotchi-statistics.schema';
import { DotchiState, DotchiStateSchema } from './dotchi-state.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DotchiDocument = Dotchi & Document;

@Schema({ collection: 'dotchis' })
export class Dotchi {
	@Prop()
	dotchi_id: string;

	@Prop({ type: DotchiStateSchema })
	state: DotchiState

	@Prop({ type: DotchiStatisticsSchema })
	statistics: DotchiStatistics

	@Prop({ type: DotchiMetricsSchema })
	metrics: DotchiMetrics

	@Prop({ type: DotchiEnvironmentSchema })
	environment: DotchiEnvironment
}

export const DotchiSchema = SchemaFactory.createForClass(Dotchi);
