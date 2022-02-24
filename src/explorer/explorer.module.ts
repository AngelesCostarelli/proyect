import { Module } from '@nestjs/common';
import { ExplorerService } from './explorer.service';
import { ExplorerController } from './explorer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExplorerSchema } from './schemas/explorer.schema';

@Module({
    imports: [MongooseModule.forFeature([
        {name: "explorer", schema: ExplorerSchema}
    ])],
    controllers: [ExplorerController],
    providers: [ExplorerService]
})
export class ExplorerModule {}
