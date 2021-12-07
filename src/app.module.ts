import { AppGateway } from './entry/socket/app.gateway';
import { DotchiService } from './services/dotchi.service';
import { SocketClient } from './clients/socket.client';
import { SoundIntensityMqttController } from './entry/mqtt/sound-intensity.mqtt.controller';
import { LightIntensityMqttController } from './entry/mqtt/light-intensity.mqtt.controller';
import { HumidityMqttController } from './entry/mqtt/humidity.mqtt.controller';
import { TemperatureMqttController } from './entry/mqtt/temperature.mqtt.controller';
import { Dotchi, DotchiSchema } from './domain/schemas/dotchi/dotchi.schema';
import { Log, LogSchema } from './domain/schemas/log/log.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LogService } from './services/log.service';
import { LogController } from './entry/http/log.controller';
import { DotchiController } from './entry/http/dotchi.controller';
import { Statisticservice } from './services/statistics.service';

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
  controllers: [TemperatureMqttController, HumidityMqttController, LightIntensityMqttController, SoundIntensityMqttController, LogController, DotchiController],
  providers: [AppGateway, DotchiService, LogService, Statisticservice, SocketClient],
})
export class AppModule { }
