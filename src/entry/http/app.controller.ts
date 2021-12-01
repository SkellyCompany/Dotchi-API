import { LogService } from './../../services/log.service';
import { DotchiService } from './../../services/dotchi.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly logService: LogService) { }

  @Get()
  getHello(): string {
    this.logService.getAll("C4:5B:BE:8C:60:F0").then(logs => {
      console.log(logs);
    })
    return "Hello";
  }
}
