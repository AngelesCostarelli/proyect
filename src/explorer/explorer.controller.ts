import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { prependListener } from 'process';
import { dataModelDto } from './dto/dataModel.dto';
import { ExplorerService } from './explorer.service';
import { Data } from './interfaces/data';

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
    createTransact(@Body() data: dataModelDto): Promise<Data> {
        return this.explorerService.createTransaction(data)
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
    //busca por cliente y devuelve todas las transacciones de ese cliente
  /*  @Get("client")
    getByClient(@Query("clientName") client){
        return this.explorerService.getByClient(client)
    }
    //busca por metodo y devuelve todas las transacciones realizadas con ese metodo
    @Get("req")
    getByRequest(@Query("request") request){
        return this.explorerService.getByRequest(request)
    }
    //busca por fecha
    @Get("date")
    getByDate(@Query("date") date){
        return this.explorerService.getByDate(date)
    }
    //busca por periodo de fechas
    @Get("dates")
    getByDates(@Query("pre") pre, @Query("post") post){
        return this.explorerService.getByDates(pre,post)
    }
    */

}
