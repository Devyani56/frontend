import axios from 'axios';
import {pollutionServiceUrl, config} from "../../urls";

interface IFilters {
    metric: string,
    duration: string,
    startDate: Date
    endDate: Date
}
export const getFilteredDataApi = async (sourceId : string, filterOptions : IFilters,  page  = 1, size = 30 ) => {
    const filter = {
        metric: filterOptions.metric,
        filter: filterOptions.duration.toLowerCase(),
        //  converrt it to format YYYY-MM-DD
        startDate: filterOptions.startDate.toISOString().split('T')[0],
        endDate: filterOptions.endDate.toISOString().split('T')[0],
        stats: 'avg',
    }
    try {
        // add filter tag to url
        const response = await axios.post(pollutionServiceUrl + `/data/filter/${sourceId}`, filter, config);
        const responseData = {
            type: "success",
            data: response.data,
            status: response.status
        }
        console.log(response.data);
        return responseData;
    }
    catch (e : any) {
        const responseData = {
            type: "error",
            data: e.response.data.errors,
            status: e.response.status
        }
        console.log(e);
        return responseData;
    }
}
