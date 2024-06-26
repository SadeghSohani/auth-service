import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './auth/filter/http-exception.filter';
import { protobufPackage } from './auth/auth.pb';


async function bootstrap() {
    const app: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.GRPC,
        options: {
            url: process.env.GRPC_URL,
            package: protobufPackage,
            protoPath: join('node_modules/grpc-proto/proto/auth.proto'),
        },
    });
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.listen();
}

bootstrap();
