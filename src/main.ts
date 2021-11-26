import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // MQTT
  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: 'mqtts://mqtt.flespi.io',
      port: 8883,
      username: 'mVmvzkQoV48q0Z5Iag03TfwMnaDohvpugzNGKuStoQKcEDKEHzwqCS0PQu1WNgeR',
      password: ''
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
