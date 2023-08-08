import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());

  const options = new DocumentBuilder()
  .setTitle('SuperFlight API')
  .setDescription('Scheduled flight app')
  .setVersion('2.0.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, options);
  //swagger options filter agrega barra de busqueda
  SwaggerModule.setup('/api/docs', app, document,{
    swaggerOptions:{
      filter:true
    }
  });

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
