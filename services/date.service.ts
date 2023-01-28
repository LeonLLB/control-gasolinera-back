import { Axios } from "axios";
import { Agent } from "https";
import dotenv from 'dotenv'
dotenv.config()

interface DateFromAPI {
    abbreviation: string;
    client_ip:    string;
    datetime:     string;
    day_of_week:  number;
    day_of_year:  number;
    dst:          boolean;
    dst_from:     null;
    dst_offset:   number;
    dst_until:    null;
    raw_offset:   number;
    timezone:     string;
    unixtime:     number;
    utc_datetime: string;
    utc_offset:   string;
    week_number:  number;
}

class DateService {

    private agent = new Agent({
        rejectUnauthorized:false
    })
    private axios = new Axios({
        httpsAgent: this.agent
    })

    async getVenezuelanDate(): Promise<Date>{
        if(process.env.NODE_ENV === 'dev'){
            return new Date(new Date().getTime()-(14400*1000))
        }
        const {data: rawData} = await this.axios.get('https://worldtimeapi.org/api/timezone/America/Caracas')
        const data: DateFromAPI = JSON.parse(rawData)    
        return new Date(new Date(data.datetime).getTime()-(14400*1000))    
    }
}

export const dateService = new DateService()