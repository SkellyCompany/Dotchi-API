import { DotchiEnvironmentDTO } from './dotchi-environment.dto';
import { DotchiMetricsDTO } from 'src/domain/dtos/dotchi/dotchi-metrics.dto';
import { DotchiStateDTO } from 'src/domain/dtos/dotchi/dotchi-state.dto';
import { DotchiStatisticsDTO } from 'src/domain/dtos/dotchi/dotchi-statistics.dto';

export interface DotchiDTO {
	dotchi_id: string;
	state: DotchiStateDTO;
	statistics: DotchiStatisticsDTO;
	metrics: DotchiMetricsDTO;
	environment: DotchiEnvironmentDTO;
}
