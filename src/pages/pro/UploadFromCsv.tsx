import {StyleSheet, css} from "aphrodite";
import Papa from "papaparse";
import {useState} from "react";
import MapFields from "./MapFields";
import {addPollutionDataApi} from "../../util/api/add-pollution-data";
import moment from "moment";
const UploadFromCsv = () => {

    const [dataFromCSV, setDataFromCSV] = useState<any>(null);
    const [headers, setHeaders] = useState<any>(null);
    const [dataFileMapping, setDataFileMapping] = useState<any>({
        dataSourceId: null,
        recordedAt: null,
        metrics: [],
    });
    const [dateFormat, setDateFormat] = useState<string>("YYYY-MM-DDTHH:mm:ss");

    const handleCsvInput =  (event: any) => {
        const csvFile = event.target.files[0];
        // parse the file using papaparse
        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.log(results)
                setHeaders(results.meta.fields);
                setDataFromCSV(results.data)
            }
        });
    }

    const modifyDateFormatToISO = (date: string, oldFormatString: string) => {
        const newDate = moment(date, oldFormatString);
        // convert it into ISO 8601 format with time and timezone
        const formattedDate = newDate.format(
            "YYYY-MM-DDTHH:mm:ssZ"
        );
        return formattedDate.toString();

    }

    const modifyDataForUpload = (e : any) => {
        // read the data generated and convert it into the format required for upload
        //     required format is like below
        // {
        //      timestamp: "2021-09-01T12:00:00",
        //     "data": [
        //        "PM10": 100,
        //        "PM25": 100,
        //   ]
        //     metadata: {
        //     dataSourceId: "5f9f5c5c-7b5c-4b5c-9c5c-5c5c5c5c5c5c",
        // }
        e.preventDefault();
        const dataToUpload : any = []
        // loop through the data and convert it into the required format
        // also convert tie stamp from given format to ISO8601 format
        dataFromCSV.forEach((data: any) => {
            const newData : any = {
                recordedAt : modifyDateFormatToISO(data[dataFileMapping.recordedAt], dateFormat),
                data: {
                },
                metadata: {
                    dataSourceId: data[dataFileMapping.dataSourceId]
                },

            }

            dataFileMapping.metrics.forEach((metric: any) => {
                newData.data[metric] = Number(data[metric])
            })

            dataToUpload.push(newData);

        })
        console.log(dataToUpload);
        setDataFromCSV(dataToUpload)


    }


    const uploadData = async (e: any) => {
        e.preventDefault();
        // upload the data to the server
        await addPollutionDataApi(dataFromCSV);
    }



    return (
        <div className={css(styles.mainDefault)}>
           <input type="file" onChange={handleCsvInput}/>
            {headers &&
                <MapFields
                    dataFieldMapping={dataFileMapping}
                    setDataFieldMapping={setDataFileMapping}
                    headers={headers}
                    setDateFormat={setDateFormat}
                />
            }
            <button onClick={(e) => modifyDataForUpload(e)}>Parse Data</button>
            <button onClick={(e) => uploadData(e)}>Upload Data</button>
        </div>
    );
}

export default UploadFromCsv;

const styles = StyleSheet.create(
    {
        mainDefault: {

        }
    }
);
