import { Log } from './../../domain/schemas/log/log.schema';
import { LogService } from './../../services/log.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('log')
export class LogController {
	constructor(private readonly logService: LogService) { }

	@Get('/:id')
	getAll(@Param('id') id): Promise<Log[]> {
		console.log("LOG")
		return this.logService.getAll(id)
	}
}
