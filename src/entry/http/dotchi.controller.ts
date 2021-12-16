import { Dotchi } from 'src/domain/schemas/dotchi/dotchi.schema';
import { DotchiService } from '../../services/dotchi.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MetricDTO } from 'src/domain/dtos/metric/metric.dto';

@Controller('dotchi')
export class DotchiController {
	constructor(private readonly dotchiService: DotchiService) { }

	@Get('/:id')
	get(@Param('id') id): Promise<Dotchi> {
		this.dotchiService.get(id);
		const m: MetricDTO = { dotchi_id: "C4:5B:BE:8C:60:F0", value: 20}
		this.dotchiService.updateLightIntensity(m);
		return this.dotchiService.get(id)
	}

	@Post('/:id')
	post(@Param('id') id): Promise<Dotchi> {
		return this.dotchiService.post(id)
	}
}
