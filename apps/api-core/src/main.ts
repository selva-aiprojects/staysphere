import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // Enable CORS
  app.enableCors({
    origin: (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:3001,http://localhost:3002').split(','),
    credentials: true,
  });

  // Swagger OpenAPI Documentation Configuration
  const config = new DocumentBuilder()
    .setTitle('StaySphere Core API — Modular Monolith')
    .setDescription(
      'Unified API for StaySphere: Property Marketplace (STAY), Travel Desk (MOVE), In-Stay Management (MY STAY), Unified Ticketing & SLA Engine (RESOLVE), and Double-Entry Ledger (FINANCE).',
    )
    .setVersion('3.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 StaySphere Modular Monolith API running on: http://localhost:${port}`);
  console.log(`📖 Swagger API Docs available at: http://localhost:${port}/docs`);
}

bootstrap();
