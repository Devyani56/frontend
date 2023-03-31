import {css, StyleSheet} from "aphrodite";
import themeVars from "../../util/themeVars";
import {useState} from "react";
import Button from "../../components/buttons/Button";
import {addPollutionDataApi} from "../../util/api/add-pollution-data";


const emptyData =
    {
        timestamp: "",
        metadata: {
            dataSourceId: "",
        },
        "data" : {
            "PM10": "",
            "PM2.5": "",
            "NO2": "",
            "SO2": "",
            "O3": "",
            "CO": "",
            "AQI": "",
        }
    }


const metrics = ["PM10", "PM2.5", "NO2", "O3", "SO2", "CO", "AQI"]

const UploadManual = () => {

    const dummyData = {
        timestamp: "2021-09-01T12:00:00",
        "data": {
            "PM10": 100,
            "PM25": 100,
            "NO2": 100,
            "SO2": 100,
        },
        metadata: {
            dataSourceId: "18",
        }
    }


    const [manualData, setManualData] = useState<any>(emptyData);

    const resetData = (e: any) => {
        e.preventDefault && e.preventDefault();
        setManualData(emptyData);
    }

    const uploadData = async (e: any) => {
        e.preventDefault();
        // remove metrics which are empty or 0
        const data = {...manualData.data}
        for (const metric in data) {
            if (data[metric] === "" || data[metric] === 0) {
                delete data[metric]
            }
        }
        const dataToSend : any = {
            timestamp: manualData.timestamp,
            metadata: {
                dataSourceId: manualData.metadata.dataSourceId,
            }
        }
        dataToSend.data = data;

        // make timestamp ISO format by adding milliseconds and Z
        dataToSend.timestamp = "2015-01-01T00:00:00+05:30"
        // add the data into an array and then send it to the backend
        const dataArr = [dataToSend];
        console.log(dataArr);

        // send the data to the backend
        const res = await addPollutionDataApi(dataArr);
        if (res.type === 'success') {
            console.log(res);
        }

        resetData("");

    }

    const UploadResetBtn = () => {
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

    // create a form in which there is a timestamp and a datasource id and then a form for each metric
    return <div>
        <div className={css(styles.mainDefault)}>
            <div className={css(styles.dsHeader)}>
                <div className={css(styles.titleHeader)}>
                    Upload Data Manually
                </div>
            </div>

            <div className={css(styles.manualInputCont)}>
                <div className={css(styles.inputCardDefault)}>
                    <div className={css(styles.fieldsCont)}>
                        <div className={css(styles.timeSourceCont)}>
                        <div className={css(styles.fieldCont)}>
                            <div className={css(styles.fieldTitle)}>
                                Timestamp
                            </div>
                            <input
                                className={css(styles.fieldInputTs)}
                                type="datetime-local"
                                value={manualData.timestamp}
                                onChange={(e) => {
                                    setManualData({...manualData, timestamp: e.target.value})
                                }}
                            />
                        </div>
                        <div className={css(styles.fieldCont)}>
                            <div className={css(styles.fieldTitle)}>
                                Data Source ID
                            </div>
                            <input
                                className={css(styles.fieldDsInput)}
                                type="text"
                                value={manualData.metadata.dataSourceId}
                                onChange={(e) => {
                                    setManualData({...manualData, metadata: {dataSourceId: e.target.value}})
                                }}
                            />
                        </div>
                        </div>

                        <div className={css(styles.metricCont)}>
                            {metrics.map((metric) => {
                                return <div className={css(styles.fieldCont)}>
                                    <div className={css(styles.field)}>
                                        <div className={css(styles.fieldTitle)}>
                                            {metric}
                                        </div>
                                        <input
                                            className={css(styles.fieldInput)}
                                            type="number"
                                            value={manualData.data[metric]}
                                            onChange={(e) => {
                                                setManualData({...manualData, data: {...manualData.data, [metric]: e.target.value}})
                                            }}
                                            min="0"
                                            step="0.01"


                                        />
                                    </div>
                                </div>
                            })}
                        </div>


                    </div>
                </div>
            </div>

            <UploadResetBtn/>

        </div>

    </div>
}

export default UploadManual



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
        manualInputCont: {
            width: '100%',
            padding: '2rem 4%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            boxSizing: 'border-box',
        },
        inputCardDefault: {
            width: '100%',
            backgroundColor: themeVars.colors.accent.light,
            padding: '2rem 4%',
            borderRadius: '1rem',
            boxSizing: 'border-box',

        },
        fieldsCont: {


        },

        timeSourceCont: {
            display: 'flex',
            flexDirection: 'row',
            gap: '5rem',
            marginBottom: '4rem',

        },

        dateTimeCont: {

        },

        label: {


        },

        dateTimeinput: {
            background: 'transparent',
            border: 'none',

        },

        dateTimeinputCont: {

        },

        dataSourceCont: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '1rem',

        },

        dataSourceInput: {

        },

        fieldCont: {
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',


        },

        fieldTitle: {
            fontSize: '1.4rem',
            minWidth:'4rem'

        },

        fieldInput: {

        },

        field: {
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            alignItems: 'center',
        },

        fieldInputTs: {
            background: 'transparent',
            border: 'none',
        },

        metricCont: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',

            '@media (max-width: 1200px)': {
                gridTemplateColumns: 'repeat(3, 1fr)',
            },

            '@media (max-width: 1000px)': {
                gridTemplateColumns: 'repeat(2, 1fr)',
            },

            '@media (max-width: 600px)': {
                gridTemplateColumns: 'repeat(1, 1fr)',
            }

        },



        fieldDsInput: {
            background: 'transparent',
            border: 'none',
        //     underline
            borderBottom: '1px solid black',
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






    }
);
