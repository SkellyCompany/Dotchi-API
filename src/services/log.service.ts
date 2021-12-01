import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocketClient } from 'src/clients/socket.client';
import { LogDTO } from 'src/domain/dtos/log/log.dto';
import { Log, LogDocument } from 'src/domain/schemas/log/log.schema';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(Log.name) private logModel: Model<LogDocument>,
    private readonly socketClient: SocketClient,
  ) { }

  create(log: LogDTO): Promise<Log> {
    return this.logModel.create(log).then(log => {
      this.socketClient.server.emit('newLog/' + log.dotchi_id, log);
      return log
    })
  }

  getAll(dotchi_id: string): Promise<Log[]> {
    return this.logModel.find({ 'dotchi_id': dotchi_id }).exec()
  }
}
