import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { prependListener } from 'process';
import { DataExplorerModelDto } from './dto/dataExplorerModel.dto';
import { ExplorerService } from './explorer.service';
import { Data } from './interfaces/explorer.interface';

@Controller('explorer')
export class ExplorerController {
    //tengo que instanciar a ExplorerService para poder usarlo
    constructor( private explorerService: ExplorerService){}
    //devuelve todas las transacciones
    @Get("all")
    getAll(): Promise<Data[]>{
        return this.explorerService.getAll();
    }
    //busca por id de transaccion y la devuelve
    @Get("id/:id")
    getById(@Param("id") id){
        return this.explorerService.getById(id);
    }
    @Post()
    createTransact(@Body() dataExplorerModelDto: DataExplorerModelDto): Promise<Data> {
        return this.explorerService.createTransaction(dataExplorerModelDto)
    }
    @Delete(":id")
    async delete(@Param("id") id){
        const deleted = await this.explorerService.delete(id)
        return deleted
    }

    @Get("client")
    getByClient(@Query("name") client): Promise<Data[]>{
        const cliente = this.explorerService.getByClient(client)
        return cliente
    }

    @Get("req")
    getByRequest(@Query("request") request): Promise<Data[]>{
        return this.explorerService.getByRequest(request)
    }
    
    @Get("date")
    getByDate(@Query("date") date): Promise<Data[]>{
        return this.explorerService.getByDate(date)
    }
    @Get("dates")
    getByDates(@Query("pre") pre, @Query("post") post): Promise<any>{
        
        return this.explorerService.getByDates(pre,post)
    }

    @Get("month")
    getLastMonth(): Promise<any>{
        return this.explorerService.getLastMonth();
    }
    @Get("hour")
    getLastHour(): Promise<any>{
        return this.explorerService.getLastHour();
    }
    @Get("day")
    getLastDay(): Promise<any>{
        return this.explorerService.getLastDay();
    }
    @Get("week")
    getLastSevenDays(): Promise<any>{
        return this.explorerService.getLastSevenDays();
    }
    
    

}
