import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { WebsocketGateway } from './sockets/websocket.gateway';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule , { cors: true });

  app.enableCors();
  const configService = app.get(ConfigService);
  app.use(bodyParser.json({ limit: '10mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Ecommerce Backend')
    .setVersion('1.0')
    .addTag('backend')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Authorization' },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen((configService.get('PORT')) || 3001);

  const eventGateway = app.get(WebsocketGateway)
  // setInterval(()=>eventGateway.sendMessage(), 3000)
  //setInterval(()=>eventGateway.sendMessage1(), 3000)
}
bootstrap();
