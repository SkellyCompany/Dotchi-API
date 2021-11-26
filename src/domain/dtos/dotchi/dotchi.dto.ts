import { DotchiMetrics } from 'src/domain/dtos/dotchi/dotchi-metrics';
import { DotchiState } from 'src/domain/dtos/dotchi/dotchi-state';
import { DotchiStatistics } from 'src/domain/dtos/dotchi/dotchi-statistics';

export interface Dotchi {
	dotchi_id: string;
	state: DotchiState;
	statistics: DotchiStatistics
	metrics: DotchiMetrics
}
