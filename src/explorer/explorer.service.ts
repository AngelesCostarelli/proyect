import { Injectable } from '@nestjs/common';
import { Data } from './interfaces/data';

@Injectable()
export class ExplorerService {
    data: Data[] = [
        {
            id: 1,
            consumer: "Client1",
            dateTime: "12/12/21",    
            requestBody: "eth_blockNumber",
            responseBody: "http://ethnode.com",
            responseCode: "200"
        },
        {
            id: 2,
            consumer: "Client1",
            dateTime: "15/10/21",    
            requestBody: "eth_blockNumber",
            responseBody: "http://ethnode.com",
            responseCode: "200"
        },
        {
            id: 3,
            consumer: "Client1",
            dateTime: "10/08/21",    
            requestBody: "eth_blockNumber",
            responseBody: "http://ethnode.com",
            responseCode: "200"
        },
        {
            id: 4,
            consumer: "Client1",
            dateTime: "20/07/21",    
            requestBody: "eth_gasPrice",
            responseBody: "http://ethnode.com",
            responseCode: "200"
        },
        {
            id: 5,
            consumer: "Client2",
            dateTime: "15/10/21",    
            requestBody: "eth_estimateGas",
            responseBody: "http://ethnode.com",
            responseCode: "200"
        },
        {
            id: 6,
            consumer: "Client2",
            dateTime: "18/10/21",    
            requestBody: "eth_blockNumber",
            responseBody: "http://ethnode.com",
            responseCode: "200"
        }, 
        {
            id: 7,
            consumer: "Client2",
            dateTime: "23/09/21",    
            requestBody: "eth_estimateGas",
            responseBody: "http://ethnode.com",
            responseCode: "200"
        }, 
        {
            id: 8,
            consumer: "Client3",
            dateTime: "20/08/21",    
            requestBody: "eth_estimateGas",
            responseBody: "http://ethnode.com",
            responseCode: "200"
        }, 
        {
            id: 9,
            consumer: "Client3",
            dateTime: "02/03/21",    
            requestBody: "eth_gasPrice",
            responseBody: "http://ethnode.com",
            responseCode: "200"
        },
        
    ];

    getAll(): Data[]{
        return this.data;
    }

    getById(id){
        return this.data.find(e => e.id == id);
    }
    
    getByClient(client){
        return this.data.filter(e => e.consumer == client);
    }
    getByRequest(req){
        return this.data.filter(e => e.requestBody == req);
    }
    getByDate(date){
        return this.data.filter(e => e.dateTime == date);
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


}


function toMs(dateStr) {
    // desarmamos el string por los '/' los descartamos y lo transformamos en un array
    let parts = dateStr.split("/")
   console.log(parts)
    // parts[2] es año
    // parts[1] el mes
    // parts[0] el día
    return new Date(parts[2], parts[1] - 1, parts[0]).getTime()
  }
