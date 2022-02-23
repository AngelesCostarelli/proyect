import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { ExplorerService } from './explorer.service';
import { Data } from './interfaces/data';

@Controller('explorer')
export class ExplorerController {
    //tengo que instanciar a ExplorerService para poder usarlo
    constructor( private explorerService: ExplorerService){}
    //devuelve todas las transacciones
    @Get("all")
    getAll(): Data[]{
        return this.explorerService.getAll();
    }
    //busca por id de transaccion y la devuelve
    @Get("id/:id")
    getById(@Param("id") id){
        return this.explorerService.getById(id);
    }
    //busca por cliente y devuelve todas las transacciones de ese cliente
    @Get("client")
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
    

}
