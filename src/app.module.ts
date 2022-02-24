import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExplorerController } from './explorer/explorer.controller';
import { ExplorerModule } from './explorer/explorer.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ExplorerModule, MongooseModule.forRoot('mongodb://localhost/database')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
