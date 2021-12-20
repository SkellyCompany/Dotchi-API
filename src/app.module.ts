import { MetricsService } from './services/metrics.service';
import { MetricsMqttController } from './entry/mqtt/metrics.mqtt.controller';
import { AppGateway } from './entry/socket/app.gateway';
import { DotchiService } from './services/dotchi.service';
import { SocketClient } from './clients/socket.client';
import { Dotchi, DotchiSchema } from './domain/schemas/dotchi/dotchi.schema';
import { Log, LogSchema } from './domain/schemas/log/log.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LogService } from './services/log.service';
import { LogController } from './entry/http/log.controller';
import { DotchiController } from './entry/http/dotchi.controller';
import { StatisticsService } from './services/statistics.service';

@Module({
  imports: [
    // DB
    MongooseModule.forRoot(
      'mongodb+srv://Skelly:pizzaSnegle@cluster0.vjdw5.mongodb.net/DotchiDB?retryWrites=true&w=majority'
    ),
    MongooseModule.forFeature(
      [
        { name: Log.name, schema: LogSchema },
        { name: Dotchi.name, schema: DotchiSchema }
      ]
    ),

    // MQTT
    ClientsModule.register([
      {
        name: 'MQTT_CLIENT',
        transport: Transport.MQTT,
        options: {
          url: 'mqtts://mqtt.flespi.io',
          port: 8883,
          username: 'mVmvzkQoV48q0Z5Iag03TfwMnaDohvpugzNGKuStoQKcEDKEHzwqCS0PQu1WNgeR',
          password: ''
        },
      },
    ]),
  ],
  controllers: [MetricsMqttController, LogController, DotchiController],
  providers: [AppGateway, DotchiService, LogService, StatisticsService, SocketClient, MetricsService],
})
export class AppModule { }
