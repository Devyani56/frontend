import themeVars from "../../util/themeVars";

import { StyleSheet, css } from "aphrodite";
import Plot from "react-plotly.js";

// import { AxisType } from 'plotly.js';
import Plotly from "plotly.js";
// import Plotly from 'plotly.js-dist';
import { PlotData } from "plotly.js";

import { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import { getPredictionDataApi } from "../../util/api/get-prediction-data-api";

import { Plus } from "phosphor-react";
import sensorBoxImg from "../../assets/images/station-box.png";
import { getFilteredDataApi } from "../../util/api/get-filtered-data";
import { getDataSourceMappingAPi } from "../../util/api/get-datasources-mapping";

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

type PredictionData = {
  recordedAt: string;
  data: { PM10: number };
};

interface StationMapping {
    [key: string]: string;
}

type chartDataType ={
    x: string[];
    y: number[];
    type: any,
    name: string
}


const dummy_data = [
  {
    recordedAt: "2023-03-07T00:00:00.000Z",
    metadata: {
      dataSourceId: "18",
      modelName: "lstm",
    },
    _id: "6406c9456190256aa72174c9",
    data: {
      PM10: 47.77228026364947,
    },
    addedAt: "2023-03-07T10:49:01.000Z",
  },
  {
    recordedAt: "2023-03-08T00:00:00.000Z",
    metadata: {
      dataSourceId: "18",
      modelName: "lstm",
    },
    _id: "6406c9456190256aa72174ca",
    data: {
      PM10: 47.88997983021476,
    },
    addedAt: "2023-03-07T10:49:01.000Z",
  },
  {
    recordedAt: "2023-03-09T00:00:00.000Z",
    metadata: {
      dataSourceId: "18",
      modelName: "lstm",
    },
    _id: "6406c9456190256aa72174cb",
    data: {
      PM10: 47.82375751660656,
    },
    addedAt: "2023-03-07T10:49:01.000Z",
  },
  {
    recordedAt: "2023-03-10T00:00:00.000Z",
    metadata: {
      dataSourceId: "18",
      modelName: "lstm",
    },
    _id: "6406c9456190256aa72174cc",
    data: {
      PM10: 47.74979554271313,
    },
    addedAt: "2023-03-07T10:49:01.000Z",
  },
  {
    recordedAt: "2023-03-11T00:00:00.000Z",
    metadata: {
      dataSourceId: "18",
      modelName: "lstm",
    },
    _id: "6406c9456190256aa72174cd",
    data: {
      PM10: 47.70706954652461,
    },
    addedAt: "2023-03-07T10:49:01.000Z",
  },
  {
    recordedAt: "2023-03-12T00:00:00.000Z",
    metadata: {
      dataSourceId: "18",
      modelName: "lstm",
    },
    _id: "6406c9456190256aa72174ce",
    data: {
      PM10: 47.692013555718454,
    },
    addedAt: "2023-03-07T10:49:01.000Z",
  },
  {
    recordedAt: "2023-03-13T00:00:00.000Z",
    metadata: {
      dataSourceId: "18",
      modelName: "lstm",
    },
    _id: "6406c9456190256aa72174cf",
    data: {
      PM10: 47.69223835493697,
    },
    addedAt: "2023-03-07T10:49:01.000Z",
  },
  {
    recordedAt: "2023-03-14T00:00:00.000Z",
    metadata: {
      dataSourceId: "18",
      modelName: "lstm",
    },
    _id: "6406c9456190256aa72174d0",
    data: {
      PM10: 47.698209173730866,
    },
    addedAt: "2023-03-07T10:49:01.000Z",
  },
];

const PredictionPlot = () => {
    const [modelName, setModelName] = useState("");
    const [dataSourceId, setDataSourceId] = useState("");
    const [dataSource, setDataSource] = useState("");
    const [loading, setLoading] = useState(false)

    var [predData, setPredData] = useState<PredictionData[]>([]);
    var [dateList, setDates] = useState<string[]>([]);
    var [metricList, setMetrics] = useState<number[]>([]);

    var [measureDateList, setMeasureDateList] = useState<string[]>([]);
    var [measuredMetricList, setMeasuredMetricList] = useState<number[]>([]);
    var [stationList, setStationList] = useState<StationMapping>({});

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>, func: any) => {
        func(event.target.value);
        console.log(typeof startDate);
    };

    // const getpreds = () => {};
    useEffect(() => {
        async function getStaionMappings() {
            try {
              const datasourcemapping = await getDataSourceMappingAPi();
              setStationList(datasourcemapping.data);    
            } catch (error) {
                setStationList({});
            }
        }     
        getStaionMappings();
    }, []);

    const processData = (data: PredictionData[]) => {
        console.log("indise preprocess =>", data);
        const dateList = data.map((item) => item.recordedAt);
        const metricList = data.map((item) => item.data.PM10);
        // setDates(dateList);
        // setMetrics(metricList);
        return {dateList:dateList, metricList:metricList};
    };

    const getPredData = async (date1: string , date2: string ) => {
        var startDate = new Date(Date.parse(date1));
        var endDate  = new Date(Date.parse(date2));
        
        const measuredData = await getFilteredDataApi(dataSourceId);
        console.log("measured data => ", measuredData.data.data);
        const response = await getPredictionDataApi(dataSourceId, modelName, startDate, endDate);
        if (response.type === "success") {
            console.log("success")
            setPredData(response.data);
            const result = processData(response.data);
            setDates(result.dateList);
            setMetrics(result.metricList);

            const result2 = processData(measuredData.data.data);
            setMeasureDateList(result2.dateList);
            setMeasuredMetricList(result2.metricList);
        }
        // setPredData(dummy_data);
        // processData(dummy_data);
        setLoading(true);
    };

    const data = [
        {
            x: dateList,
            y: metricList,
            mode: "lines",
        },
        {
            x: measureDateList,
            y: measuredMetricList,
            mode: "lines",
        }
    ];
    const layout = { title: "Chart Title" };

  return (
    <div className={css(styles.boardDefault)}>
        <div className={css(styles.predictionSelectCont)}>
            <div className={css(styles.modelSelector)}>
                  <label className={css(styles.modelLabel)}>Model</label>
                  <select className={css(styles.modeSelect)} value={modelName} onChange={(e) => setModelName(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value="lstm">lstm model</option>
                    <option value="prophet">facebook's prophet model</option>
                  </select>
            </div>

            <div className={css(styles.stationSelector)}>
                  <select  className={css(styles.modeSelect)} value={dataSource} onChange={(e) => {setDataSource(e.target.value); setDataSourceId((e.target.selectedIndex.toString()))}}>
                    <option value="">Select an option</option>
                    {Object.keys(stationList).map((key) => {
                        return (
                        <option key={key} value={key}>
                            {stationList[key]}
                        </option>
                        );
                    })}

                  </select>
            </div>
                <div className={css(styles.timeFilterCont)}>
                    <input type={"date"} name={"start-date"} value={startDate} onChange={(event) => handleDateChange(event, setStartDate)} className={css(styles.timeFilter)} />
                    <input type={"date"} name={"end-date"} value={endDate} onChange={(event) => handleDateChange(event, setEndDate)}  className={css(styles.timeFilter)}/>
                </div>

            <button className={css(styles.getPredBtn)} onClick={(event) => getPredData(startDate, endDate)}>Get Predictions</button>
        </div>
      {loading ? (
        <div className={css(styles.dsHeader)}>
          <Plot data={data} layout={layout} config={{ displayModeBar: true }} />
        </div>
      ) : null}



    </div>
  );
};

export default PredictionPlot;

const styles = StyleSheet.create({
  boardDefault: {
    width: "100%",
    minHight: "100%",
    boxSizing: "border-box",
      borderRadius: "7.4rem",
      border: "1px solid " + themeVars.colors.accent.green,
      minHeight: "50rem",
  },

    predictionSelectCont: {
        width: "100%",
        boxSizing: "border-box",
        background: themeVars.colors.accent.green,
        borderRadius: "10rem",
        padding: "2rem 4%",
        display: "flex",
        justifyContent: "center",
        gap: "5rem",
        alignItems: "center",
        borderBottomRightRadius: "0",
        borderBottomLeftRadius: "0",

    },

    modelSelector: {

    },

    modelLabel: {
        color: 'white',
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginRight: "0.4rem",
    },

    stationSelect: {
        background: 'transparent',
        display: "flex",
        alignItems: "center",
        borderRadius: "0.5rem",
        width: "14rem",
        outline: "none",

    },

    stationSelector: {

    },

    modeSelect: {
        background:'transparent',
        border: 'none',
        color: 'white',
        fontSize: "1.5rem",
        fontWeight: "bold",
        outline: "none",
        textDecoration: "underline",
        width: "14rem",

    },

    getPredBtn: {
        background: themeVars.colors.alerts.green,
        color: 'white',
        fontSize: "1.5rem",
        padding: "0.5rem 1rem",
        borderRadius: "2rem",
        alignSelf: 'flex-end',
        border: "none",

    },

  dataSourceCont: {
    width: "100%",
    minHeight: "100%",
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridGap: "1rem",
    padding: "0 3rem",

    gridAutoRows: "minmax(32rem, 32rem)",

    "@media (max-width: 1600px)": {
      gridTemplateColumns: "1fr 1fr 1fr",
    },

    "@media (max-width: 1300px)": {
      gridTemplateColumns: "1fr 1fr",
    },

    "@media (max-width: 980px)": {
      gridTemplateColumns: "1fr",
    },
  },

  dsHeader: {
   display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem 3rem",
  },

  noDataSourceCont: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    position: "relative",
  },

  sensorBoxImg: {
    width: "35%",
    marginRight: "10%",
    marginTop: "10%",
    opacity: 0.5,
  },

  notFoundText: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: themeVars.colors.accent.darkGreen,
    position: "absolute",
    marginRight: "10%",
    bottom: "40%",
  },

  titleHeader: {
    fontSize: "2.8rem",
    fontWeight: "normal",
    color: themeVars.colors.accent.dark,
  },

  timeFilterCont: {

  },

  timeFilter: {
    width: '10rem',
    height: '3.2rem',
    border: 'none',
    padding: '0 1rem',
    borderRadius: '2rem',

    ':first-child': {
        borderRadius: '2rem 0 0 2rem',
        borderRight: '0.5px solid rgba(256, 256, 256, 0.08)',
    },

    ':last-child': {
        borderRadius: '0 2rem 2rem 0',
    },

    color: 'white',
    fontSize: '1rem',
    fontWeight: 600,
    letterSpacing: '0.065em',

    background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%23fff' d='M10 13.414l-6.707-6.707 1.414-1.414L10 10.586l5.293-5.293 1.414 1.414z'/></svg>") no-repeat right 0.75rem center/9px 9px`,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',

    ':focus': {
        outline: 'none',
    },

//     remove the date picker icon
    '::-webkit-calendar-picker-indicator': {
        opacity: 0,
    }

},

});
