import {Route, Routes, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getDataSourceAPi} from "../../util/api/get-datasources-api";
import {css, StyleSheet} from "aphrodite";
import Papa from "papaparse";
import UploadOptions from "./UploadOptions";
import UploadFromCsv from "./UploadFromCsv";
import UploadManual from "./UploadManual";
const UploadDataBoard = () => {

    // get the data source id from the url last part
    const location = useLocation();
    const id = location.pathname.split("/").pop();

    // get the dataSource info
    const [dataSource, setDataSource] = useState(null);

    const getDataSource = async () => {
        const response = await getDataSourceAPi(id);
        if (response.type === 'success') {
            setDataSource(response.data);
        }
    }

    useEffect(() => {
        getDataSource();
    }
    , [])

    const changeHandler = (event: any) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.log(results.data)
            },
        });
    }

    return (
        <div className={css(styles.mainDefault)}>
            <Routes>
                <Route path="/" element={<UploadOptions/>}/>
                <Route path="/from-csv" element={<UploadFromCsv/>}/>
                <Route path="/manual" element={<UploadManual/>}/>
            </Routes>

        </div>

    );
}

export default UploadDataBoard;

const styles = StyleSheet.create(
    {
        mainDefault: {

        }
    }
);
