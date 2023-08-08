import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flight/flight.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development']
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB),
    FlightModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
