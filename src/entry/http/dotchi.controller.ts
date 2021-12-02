import { Dotchi } from 'src/domain/schemas/dotchi/dotchi.schema';
import { DotchiService } from '../../services/dotchi.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('dotchi')
export class DotchiController {
	constructor(private readonly dotchiService: DotchiService) { }

	@Get('/:id')
	get(@Param('id') id): Promise<Dotchi> {
		this.dotchiService.create(id);
		return this.dotchiService.get(id)
	}
}
