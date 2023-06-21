import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import { isProductionEnv } from './helpers';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  logger.log({
    redisHost: configService.get('REDIS_HOST'),
    redisPort: configService.get('REDIS_PORT'),
  });
  const redisClient = createClient({
    url: `redis://${configService.get('REDIS_HOST')}:${configService.get(
      'REDIS_PORT',
    )}`,
  });
  // const redisClient = createClient();

  await redisClient.connect();

  redisClient.on('error', (err) => logger.error('Error with redis connection'));
  redisClient.on('connect', () =>
    logger.verbose('Connected to redis Successfully'),
  );

  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
      }),
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: 'strict',
        secure: isProductionEnv(configService),
      },
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
