import { Injectable } from '@nestjs/common';
import { LogDTO } from 'src/domain/dtos/log/log.dto';
import { Log } from 'src/domain/schemas/log/log.schema';

@Injectable()
export class LogService {
  insert(log: LogDTO) {
    //Save to database
    console.log();
  }

  getAll(): Promise<Log[]> {
    return null;
  }
}