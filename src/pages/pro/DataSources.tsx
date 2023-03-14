import themeVars from "../../util/themeVars";

import {StyleSheet, css} from "aphrodite";
import DataSourceCard from "./DataSourceCard";
import {getDataSourceAPi} from "../../util/api/get-datasources-api";
import {useEffect, useState} from "react";
import dataSourceCard from "./DataSourceCard";
import Button from "../../components/buttons/Button";
import {Plus} from "phosphor-react";
import AddDataSourceModal from "./AddDataSourceModal";
import {IDataSourceData} from "./IDataSource";
import sensorBoxImg from "../../assets/images/station-box.png";

const emptyDataSource : IDataSourceData = {
    "location": {
        "lat": 0,
        "lng": 0,
        "address": ""
    },
    "creator": "",
    "admins": [
        ""
    ],
    "name": "",
    "type": "manual",
    "description": "",
    "metrics": {
        "PM10": false,
        "PM2.5": false,
        "O3": false,
        "NO2": false,
        "CO": false,
        "SO2": false,
        "NH3": false,
        "AQI": false
    },
    "expectedFrequencySeconds": 0,
    "expectedFrequencyType": "seconds",
    "secondsSinceLastUpdate": 0,
    "id": ""
}
const DataSources = () => {
    const [dataSourceData, setDataSourceData] = useState<IDataSourceData[]>([]);

    const [dataSourceFormData, setDataSourceFormData] = useState<IDataSourceData >(
        emptyDataSource
    );

    const resetDataSourceFormData = () => {
        setDataSourceFormData(emptyDataSource);
    }

    const getAndSetDataSourceData = async () => {
        const res = await getDataSourceAPi();
        if (res.type === "success") {
            setDataSourceData(res.data);
        }
    }

    useEffect(() => {
        getAndSetDataSourceData();
    }
    , []);

    const [showAddDataSourceModal, setShowAddDataSourceModal] = useState(false);

    return (
        <div className={css(styles.boardDefault)}>
            <AddDataSourceModal
                onClose={() => {resetDataSourceFormData(); setShowAddDataSourceModal(false)}}
                isOpen={showAddDataSourceModal}
                formData={dataSourceFormData}
                setFormData={setDataSourceFormData}
            />

            <div className={css(styles.dsHeader)}>
                <div className={css(styles.titleHeader)}>
                   Data Sources
                </div>
                <Button
                    type={"short"}
                    color={themeVars.colors.accent.darkGreen}
                    onClick={() => setShowAddDataSourceModal(true)}
                >
                    Add Data Source
                    <Plus size={20} weight="bold" />
                </Button>
            </div>
            {dataSourceData.length !== 0 &&
                <div className={css(styles.dataSourceCont)}>
                    {
                        dataSourceData.map((dataSource) => {
                        return <DataSourceCard data={dataSource}/>
                })}

            </div>}
            {dataSourceData.length === 0 &&
                <div className={css(styles.noDataSourceCont)}>

                    <img src={sensorBoxImg} alt="sensor box" className={css(styles.sensorBoxImg)} />
                </div>
            }

        </div>
    );
}

export default DataSources;


const styles = StyleSheet.create(
    {
        boardDefault: {
            width: '100%',
            minHight: '100%',
            boxSizing: 'border-box',
        },

        dataSourceCont: {
            width: '100%',
            minHeight: '100%',
            boxSizing: 'border-box',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridGap: '1rem',
            padding: '0 3rem',

            gridAutoRows: 'minmax(32rem, 32rem)',

            '@media (max-width: 1600px)': {
                gridTemplateColumns: '1fr 1fr 1fr',
            },

            '@media (max-width: 1300px)': {
                gridTemplateColumns: '1fr 1fr',
            },

            '@media (max-width: 980px)': {
                gridTemplateColumns: '1fr',
            }
        },

        dsHeader: {
            width: '100%',
            padding: '2rem 4%',
            display: 'flex',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            alignItems: 'center',

        },

        noDataSourceCont: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            position: 'relative',
        },

        sensorBoxImg: {
            width: '35%',
            marginRight: '10%',
            marginTop: '10%',
            opacity: 0.5,
        },

        notFoundText: {
            fontSize: '3rem',
            fontWeight: 'bold',
            color: themeVars.colors.accent.darkGreen,
            position: 'absolute',
            marginRight: '10%',
            bottom: '40%',
        },

        titleHeader: {
            fontSize: '2.8rem',
            fontWeight: 'normal',
            color: themeVars.colors.accent.dark
        },
    }
);
