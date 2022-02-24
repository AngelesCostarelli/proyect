import { Document } from "mongoose"


export interface Data  extends Document{
    id?: number;
    consumer: string;
    dateTime: string;    
    requestBody: string;
    responseBody: string;
    responseCode: string;
}