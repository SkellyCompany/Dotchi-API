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

  insert(log: LogDTO) {
    this.logModel.create(log);
  }

  async getAll(): Promise<Log[]> {
    try {
      await this.logModel.find({}, function (err, logs){
        return logs;
      });
    }
    catch (err) {
      return null;
    }
  }
}
