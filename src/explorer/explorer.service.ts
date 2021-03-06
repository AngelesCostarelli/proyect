import { Injectable } from '@nestjs/common';
import { Data } from './interfaces/explorer.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataExplorerModelDto } from './dto/dataExplorerModel.dto'; 



@Injectable()
export class ExplorerService {
    // data: Data[] = [
    //     {
    //         id: 1,
    //         consumer: "Client1",
    //         dateTime: "12/12/21",    
    //         requestBody: "eth_blockNumber",
    //         responseBody: "http://ethnode.com",
    //         responseCode: "200"
    //     },
    //     {
    //         id: 2,
    //         consumer: "Client1",
    //         dateTime: "15/10/21",    
    //         requestBody: "eth_blockNumber",
    //         responseBody: "http://ethnode.com",
    //         responseCode: "200"
    //     },
    //     {
    //         id: 3,
    //         consumer: "Client1",
    //         dateTime: "10/08/21",    
    //         requestBody: "eth_blockNumber",
    //         responseBody: "http://ethnode.com",
    //         responseCode: "200"
    //     },
    //     {
    //         id: 4,
    //         consumer: "Client1",
    //         dateTime: "20/07/21",    
    //         requestBody: "eth_gasPrice",
    //         responseBody: "http://ethnode.com",
    //         responseCode: "200"
    //     },
    //     {
    //         id: 5,
    //         consumer: "Client2",
    //         dateTime: "15/10/21",    
    //         requestBody: "eth_estimateGas",
    //         responseBody: "http://ethnode.com",
    //         responseCode: "200"
    //     },
    //     {
    //         id: 6,
    //         consumer: "Client2",
    //         dateTime: "18/10/21",    
    //         requestBody: "eth_blockNumber",
    //         responseBody: "http://ethnode.com",
    //         responseCode: "200"
    //     }, 
    //     {
    //         id: 7,
    //         consumer: "Client2",
    //         dateTime: "23/09/21",    
    //         requestBody: "eth_estimateGas",
    //         responseBody: "http://ethnode.com",
    //         responseCode: "200"
    //     }, 
    //     {
    //         id: 8,
    //         consumer: "Client3",
    //         dateTime: "20/08/21",    
    //         requestBody: "eth_estimateGas",
    //         responseBody: "http://ethnode.com",
    //         responseCode: "200"
    //     }, 
    //     {
    //         id: 9,
    //         consumer: "Client3",
    //         dateTime: "02/03/21",    
    //         requestBody: "eth_gasPrice",
    //         responseBody: "http://ethnode.com",
    //         responseCode: "200"
    //     },
        
    // ];
    constructor(@InjectModel('explorer') private DataModel: Model<Data>){}
    
    async getAll(){
        return await this.DataModel.find()
    }

    async getById(id){
        return await this.DataModel.findById(id)
    }

    async createTransaction(dataExplorerModelDto: DataExplorerModelDto){
        const newTrans = new this.DataModel(dataExplorerModelDto)
       
        return await newTrans.save()
    }
    async delete(id): Promise<any>{
      const deleteTrans = await this.DataModel.findOneAndDelete(id)
      return deleteTrans
    }

    async getByClient(client){
        const cliente = await this.DataModel.find({consumer:client})
        return cliente
    }

    async getByRequest(req){
        return await this.DataModel.find({requestBody:req})
    }

    async getByDate(date){
        const fecha = new Date(date)
        console.log(fecha)
        return await this.DataModel.find({dateTime:fecha})
    }

    async getByDates(preDate, postDate){
        let pre = new Date(preDate)
        let post = new Date(postDate)
        let filter = this.DataModel.find({$and : [{dateTime : {$gte : pre }}, {dateTime : {$lte : post}}]})
        return filter 
       
    }

    async getLastMonth(){
        var d = new Date();
        d.setMonth(d.getMonth() - 1); //1 month ago
        let found = await this.DataModel.find({dateTime:{$gte:d}}); 
            return found
    }
    async getLastHour(){
        var d = new Date();
        d.setHours(d.getHours() - 1); //1 hour ago
        let found = await this.DataModel.find({dateTime:{$gte:d}}); 
            return found
    }
    async getLastDay(){
        var d = new Date();
        d.setHours(d.getHours() - 24); //1 hour ago
        let found = await this.DataModel.find({dateTime:{$gte:d}}); 
            return found
    }
    async getLastSevenDays(){
        var d = new Date();
        d.setHours(d.getHours() - 168); //1 hour ago
        let found = await this.DataModel.find({dateTime:{$gte:d}}); 
            return found
    }

  
}


