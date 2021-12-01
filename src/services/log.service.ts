import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogDTO } from 'src/domain/dtos/log/log.dto';
import { Log, LogDocument } from 'src/domain/schemas/log/log.schema';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(Log.name) private logModel: Model<LogDocument>
  ) { }

  create(log: LogDTO): Promise<Log> {
    return this.logModel.create(log)
  }

  getAll(): Promise<Log[]> {
    return this.logModel.find().exec()
  }
}
