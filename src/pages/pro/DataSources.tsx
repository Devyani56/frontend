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

const DUMMY_DATA : IDataSourceData[] = [
    {
        "location": {
            "lat": 15.6967,
            "lng": 124.48605,
            "address": "IIT Goa Hostel 2, Farmagudi, Ponda, Goa, 403401"
        },
        "creator": "63c80894969e74562de33094",
        "admins": [
            "63c80894969e74562de33094"
        ],
        "name": "iitgoa-hostel-3",
        "type": "manual",
        "description": "data source for collecting data in iit goa hostel by students",
        "metrics": {
            "PM10": true,
            "PM2.5": false,
            "O3": false,
            "NO2": false,
            "CO": false,
            "SO2": true,
            "NH3": false,
            "AQI": false
        },
        "expectedFrequencySeconds": 20,
        "expectedFrequencyType": "seconds",
        "secondsSinceLastUpdate": 315360000,
        "id": "63d27ef3da68855af3a6149b"
    },
    {
        "location": {
            "lat": 14.6967,
            "lng": 124.48605,
            "address": "IIT Goa Hostel 2, Farmagudi, Ponda, Goa, 403401"
        },
        "creator": "63c80894969e74562de33094",
        "admins": [
            "63c80894969e74562de33094"
        ],
        "name": "iitgoa-hostel-2",
        "type": "manual",
        "description": "data source for collecting data in iit goa hostel by students",
        "metrics": {
            "PM10": true,
            "PM2.5": false,
            "O3": false,
            "NO2": false,
            "CO": false,
            "SO2": true,
            "NH3": false,
            "AQI": false
        },
        "expectedFrequencySeconds": 15,
        "expectedFrequencyType": "seconds",
        "secondsSinceLastUpdate": 315360000,
        "id": "63d28917f32c4df6dba058bc"
    },
    {
        "location": {
            "lat": 15.6967,
            "lng": 124.48605,
            "address": "IIT Goa Hostel 2, Farmagudi, Ponda, Goa, 403401"
        },
        "creator": "63c80894969e74562de33094",
        "admins": [
            "63c80894969e74562de33094"
        ],
        "name": "iitgoa-hostel-3",
        "type": "manual",
        "description": "data source for collecting data in iit goa hostel by students",
        "metrics": {
            "PM10": true,
            "PM2.5": false,
            "O3": false,
            "NO2": false,
            "CO": true,
            "SO2": false,
            "NH3": false,
            "AQI": false
        },
        "expectedFrequencySeconds": 20,
        "expectedFrequencyType": "seconds",
        "secondsSinceLastUpdate": 315360000,
        "id": "63d27ef3da68855af3a6149b"
    },
    {
        "location": {
            "lat": 15.6967,
            "lng": 124.48605,
            "address": "IIT Goa Hostel 2, Farmagudi, Ponda, Goa, 403401"
        },
        "creator": "63c80894969e74562de33094",
        "admins": [
            "63c80894969e74562de33094"
        ],
        "name": "iitgoa-hostel-3",
        "type": "manual",
        "description": "data source for collecting data in iit goa hostel by students",
        "metrics": {
            "PM10": true,
            "PM2.5": false,
            "O3": false,
            "NO2": true,
            "CO": false,
            "SO2": false,
            "NH3": false,
            "AQI": false
        },
        "expectedFrequencySeconds": 20,
        "expectedFrequencyType": "seconds",
        "secondsSinceLastUpdate": 315360000,
        "id": "63d27ef3da68855af3a6149b"
    }
]

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
    getDataSourceAPi().then((res) => {
        if (res.type === "success") {
            setDataSourceData(res.data);
        }
    });
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
                <Button
                    type={"short"}
                    color={themeVars.colors.accent.darkGreen}
                    onClick={() => setShowAddDataSourceModal(true)}
                >
                    Add Data Source
                    <Plus size={20} weight="bold" />
                </Button>
            </div>
            <div className={css(styles.dataSourceCont)}>
                {dataSourceData.map((dataSource) => {
                    return <DataSourceCard data={dataSource}/>
                })}
            </div>

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
            padding: '2rem 6%',
            display: 'flex',
            justifyContent: 'flex-end',
            boxSizing: 'border-box',

        }
    }
);
