import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExplorerController } from './explorer/explorer.controller';
import { ExplorerModule } from './explorer/explorer.module';

@Module({
  imports: [ExplorerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
