import {Schema}  from "mongoose";
//es la biblioteca de mongoose por lo que no usamos typescript
export const ExplorerSchema = new Schema({
    consumer: String,
    dateTime: Date,    
    requestBody: String,
    responseBody: String,
    responseCode: String
})