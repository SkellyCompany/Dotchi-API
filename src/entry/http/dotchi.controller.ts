import { Dotchi } from 'src/domain/schemas/dotchi/dotchi.schema';
import { DotchiService } from '../../services/dotchi.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('dotchi')
export class DotchiController {
	constructor(private readonly dotchiService: DotchiService) { }

	@Get('/:id')
	get(@Param('id') id): Promise<Dotchi> {
		this.dotchiService.get(id);
		return this.dotchiService.get(id)
	}

	@Post()
	post(@Body() dotchi: Dotchi): Promise<Dotchi> {
		return this.dotchiService.post(dotchi)
	}
}
