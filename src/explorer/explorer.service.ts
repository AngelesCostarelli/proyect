import { Injectable } from '@nestjs/common';
import { Data } from './interfaces/data';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataExplorerModelDto} from './dto/dataModel.dto';



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

    
    // getAll(): Data[]{
    //     return this.data;
    // }

    // getById(id){
    //     return this.data.find(e => e.id == id);
    // }
    /*
    getByClient(client){
        return this.DataModel.filter(e => e.consumer == client);
    }
    getByRequest(req){
        return this.DataModel.filter(e => e.requestBody == req);
    }
    getByDate(date){
        return this.DataModel.filter(e => e.dateTime == date);
    }
    
    getByDates(preDate, postDate){
        let pre = toMs(preDate)
        let post = toMs(postDate)
        let filter = this.data.filter((e) => {
           return toMs(e.dateTime) >= pre && toMs(e.dateTime) <= post
        })

        console.log(filter)
        return filter;
    }

*/
}


// function toMs(dateStr) {
//     // desarmamos el string por los '/' los descartamos y lo transformamos en un array
//     let parts = dateStr.split("/")
//    console.log(parts)
//     // parts[2] es año
//     // parts[1] el mes
//     // parts[0] el día
//     return new Date(parts[2], parts[1] - 1, parts[0]).getTime()
//   }
