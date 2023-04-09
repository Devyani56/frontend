// @ts-nocheck
import {StyleSheet, css} from "aphrodite";
import { uploadDataSourceApi } from "../../util/api/upload-data";
import Papa from "papaparse";
import {useState, useRef} from "react";
import MapFields from "./MapFields";
import {addPollutionDataApi} from "../../util/api/add-pollution-data";
import moment, {max} from "moment";
import Button from "../../components/buttons/Button";
import themeVars from "../../util/themeVars";
import {Plus} from "phosphor-react";
import MapFieldsModal from "./MapFieldsModal";
import DataTable from "react-data-table-component";
import VerticalGap from "../../components/VerticalGap";
import Modal from "../../components/modals/Modal";
import ProgressBar from "@ramonak/react-progress-bar";

interface UploadingModalProps {
    uploadStatus: any;
    isUploading: boolean;
}
const UploadingModal = ({uploadStatus, isUploading} : UploadingModalProps) => {
    return (
    <Modal isOpen={isUploading} onClose={()=>{}}>
        <div className={css(styles.modalContainer)}>
            <div className={css(styles.modalContent)}>
                <div className={css(styles.modalHeader)}>
                    <h2>Uploading Data</h2>
                    <div>
                        <ProgressBar completed={uploadStatus.count / uploadStatus.total * 100} height="100px" bgColor={themeVars.colors.accent.green} height="10px" labelColor={themeVars.colors.accent.dark} labelAlignment="outside" />
                    </div>
                </div>
            </div>
        </div>
    </Modal>
    )
}
const UploadFromCsv = () => {

    const [dataFromCSV, setDataFromCSV] = useState<any>(null);
    const [headers, setHeaders] = useState<any>(null);
    const fileInput = useRef<any>(null);
    const [dataFileMapping, setDataFileMapping] = useState<any>({
        dataSourceId: null,
        recordedAt: null,
        metrics: [],
    });
    const [uploadStatus, setUploadStatus] = useState<{}>({count: 0, total: 99999999});
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [dateFormat, setDateFormat] = useState<string>("YYYY-MM-DDTHH:mm:ss");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([
        {
            name: 'TimeStamp',
            selector: row => row.recordedAt,
            sortable: true,
        },

    ]);

    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState<number>(10000);
    const [currentPage, setCurrentPage] = useState(1);
    const handleCsvInput =  (event: any) => {
        const csvFile = event.target.files[0];
        // parse the file using papaparse
        // check if the file is valid
        if (!csvFile) {
            console.log("No file selected");
            return;
        }
        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.log(results)
                setHeaders(results.meta.fields);
                setDataFromCSV(results.data)
            }
        });
        setIsModalOpen(true);
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
                // remove special characters from name like . etc
                const newMetric = metric.replace(/[^\w\s]/gi, '')
                console.log("Im here------", metric, newMetric)
                newData.data[newMetric] = Number(data[metric])
            })

            console.log("xxx-----",newData)
            dataToUpload.push(newData);

        })
        console.log(dataToUpload);
        setDataFromCSV(dataToUpload)
        setIsModalOpen(false);

        const columns = [
            {
                name: 'Time Stamp',
                selector: row => formatTimeToLookGood(row.recordedAt),
                sortable: true,
            },

            {
                name: 'Station ID',
                selector: row => row.metadata.dataSourceId,
                sortable: true,
            }

        ];

        dataFileMapping.metrics.forEach((metric: any) => {
            columns.push({
                name: metric,
                selector: row => row.data[metric.replace(/[^\w\s]/gi, '')],
                sortable: true,
            })
        })



        setColumns(columns);
        setData(dataToUpload);

        setTotalRows(dataToUpload.length);
    }

    const uploadData = async (e: any) => {
        e.preventDefault();
        // upload the data to the server
        // run a loop and upload 1000 data at a time
        // show the progress of the upload

        setIsUploading(true);
        setUploadStatus({count: 0, total: dataFromCSV.length})
        for (let i = 0; i < data.length; i += 1000) {
            // get 1000 data or rest of the data
            const end = Math.max(i + 1000, data.length);
            console.log("uploading:: ",i, end);
            const dataToUpload = dataFromCSV.slice(i, end);
            // upload the data
            const res = await addPollutionDataApi(dataToUpload);
            if (res.type === "error") {
                // wait for 10000 seconds and then try again
                await new Promise(resolve => setTimeout(resolve, 10000));
            }
            console.log(i,"::", end, "::", res);
            // update the progress
            setUploadStatus({count: end, total: dataFromCSV.length})
        }
        setIsUploading(false);
        // show the success message
        console.log("Data uploaded successfully");
    }

    const formatTimeToLookGood = (time: string) => {
        const newTime = moment(time).format("DD MMM YYYY, hh:mm:ss A");
        return newTime;
    }
    const resetData = () => {
        setDataFromCSV(null);
        setData([]);
        setDataFileMapping ({
            dataSourceId: null,
            recordedAt: null,
            metrics: [],
        })
        setColumns([
            {
                name: 'Time Stamp',
                selector: row => formatTimeToLookGood(row.recordedAt),
                sortable: true,
            },

        ]);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const UploadResetBtn = () => {
        if (data.length === 0) {
            return null;
        }
        return (

                <div className={css(styles.uploadBtnCont)}>
                    <Button
                        onClick={(e) => resetData(e)}
                        type={'long'}
                        color={themeVars.colors.accent.transparentGreen}
                        textColor={themeVars.colors.accent.darkGreen}
                    >
                        Reset
                    </Button>

                    <Button
                        onClick={(e) => uploadData(e)}
                        type={'long'}
                        color={themeVars.colors.accent.darkGreen}
                    >
                        Upload
                    </Button>
                </div>
        )
    }


    return (
        <>
            {isUploading && <UploadingModal isUploading={isUploading} uploadStatus={uploadStatus}/>}

            <div className={css(styles.mainDefault)}>
                <div className={css(styles.dsHeader)}>
                    <div className={css(styles.titleHeader)}>
                        Upload Data from CSV
                    </div>
                </div>
                {data.length === 0 &&
                    <div className={css(styles.fileInputCont)}>
                        <button className={css(styles.fileInputBtn)} onClick={() => fileInput.current.click()}>
                            <Plus className={css(styles.plus)} size={24}/>
                        </button>
                        <input
                            type="file"
                            style={{display: 'none'}}
                            onChange={handleCsvInput}
                            ref={fileInput}
                        />
                    </div>}
                <MapFieldsModal isOpen={isModalOpen} onClose={closeModal} onConfirm={closeModal}>
                    {headers &&
                        <MapFields
                            dataFieldMapping={dataFileMapping}
                            setDataFieldMapping={setDataFileMapping}
                            headers={headers}
                            setDateFormat={setDateFormat}
                            dateFormat={dateFormat}
                            onParseData={modifyDataForUpload}
                        />
                    }
                </MapFieldsModal>
                {/*<UploadResetBtn/>*/}
                <div className={css(styles.tableCont)}>
                    {(loading || data.length !== 0) && <DataTable
                        columns={columns}
                        data={data}
                        progressPending={loading}
                        pagination
                        paginationTotalRows={totalRows}
                        paginationDefaultPage={currentPage}
                        responsive={true}
                        highlightOnHover={true}
                        style={{ width: '100%' }}
                    />}
                </div>
                <UploadResetBtn/>
                <VerticalGap gap={'2rem'}/>

            </div>
        </>
    );
}

export default UploadFromCsv;

const styles = StyleSheet.create(
    {
        mainDefault: {

        },
        dsHeader: {
            width: '100%',
            padding: '2rem 4%',
            display: 'flex',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            alignItems: 'center',

        },

        titleHeader: {
            fontSize: '2.8rem',
            fontWeight: 'normal',
            color: themeVars.colors.accent.dark
        },

        fileInput: {
            display: 'none',

        },

        fileInputCont: {
            width: '100%',
            padding: '2rem 4%',
            display: 'flex',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
        },

        fileInputBtn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            border: `1px solid ${themeVars.colors.accent.green}`,
            borderRadius: '0.5rem',
            fontSize: '1.8rem',
            fontWeight: 'normal',
            padding: '1rem 2rem',
            backgroundColor: themeVars.colors.accent.transparentGreen2,
            cursor: 'pointer',

        },

        plus: {
            color: themeVars.colors.accent.darkGreen,
            // backgroundColor: themeVars.colors.accent.darkGreen,
            // border: `1px solid ${themeVars.colors.accent.darkGreen}`,
            borderRadius: '50%',
            padding: '0.5rem',

        },

        tableCont: {
            width: '100%',
            padding: '2rem 4%',
            boxSizing: 'border-box',
        },

        uploadBtnCont: {
            width: '100%',
            padding: '2rem 4%',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '3rem',
        },

        modalContainer : {
            width: '100%',
            height: '100%',
            borderRadius: '1rem',
            backgroundColor: themeVars.colors.accent.light,


        },

        modalHeader : {
            width: '100%',
            fontSize: '1.2rem',
            fontWeight: 'normal',
            color: themeVars.colors.accent.dark,

        },

        modalContent : {
            width: '100%',
            padding: '2rem 4%',
            boxSizing: 'border-box',
            paddingBottom: '3rem',
        }



    }
);