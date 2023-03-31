import themeVars from "../../util/themeVars";

import { StyleSheet, css } from "aphrodite";
import Plot from "react-plotly.js";

// import { AxisType } from 'plotly.js';
import Plotly from "plotly.js";
// import Plotly from 'plotly.js-dist';
// import { PlotData } from "plotly.js";

import { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import { getPredictionDataApi } from "../../util/api/get-prediction-data-api";
import { Data, Layout } from "plotly.js";

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
    name: string,
    mode: string,
    line: {
      color: string,
    },
}



const ComparePredictionPlots = () => {
    const [modelName1, setModelName1] = useState("");
    const [modelName2, setModelName2] = useState("");

    const [dataSourceId1, setDataSourceId1] = useState("");
    const [dataSource1, setDataSource1] = useState("");

    const [dataSourceId2, setDataSourceId2] = useState("");
    const [dataSource2, setDataSource2] = useState("");

    const [loading, setLoading] = useState(false)

    var [predData1, setPredData1] = useState<PredictionData[]>([]);
    var [predData2, setPredData2] = useState<PredictionData[]>([]);

    var [dateList1, setDates1] = useState<string[]>([]);
    var [metricList1, setMetrics1] = useState<number[]>([]);
    var [dateList2, setDates2] = useState<string[]>([]);
    var [metricList2, setMetrics2] = useState<number[]>([]);

    var [measureDateList1, setMeasureDateList1] = useState<string[]>([]);
    var [measuredMetricList1, setMeasuredMetricList1] = useState<number[]>([]);

    var [measureDateList2, setMeasureDateList2] = useState<string[]>([]);
    var [measuredMetricList2, setMeasuredMetricList2] = useState<number[]>([]);

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
        
        const measuredData1 = await getFilteredDataApi(dataSourceId1);

        console.log("measured data => ", measuredData1.data.data);
        const response1 = await getPredictionDataApi(dataSourceId1, modelName1, startDate, endDate);
        if (response1.type === "success") {
            console.log("success")
            setPredData1(response1.data);

            const result = processData(response1.data);
            setDates1(result.dateList);
            setMetrics1(result.metricList);

            const result2 = processData(measuredData1.data.data);
            setMeasureDateList1(result2.dateList);
            setMeasuredMetricList1(result2.metricList);
        }

        const measuredData2 = await getFilteredDataApi(dataSourceId2);

        console.log("measured data => ", measuredData2.data.data);
        const response2 = await getPredictionDataApi(dataSourceId2, modelName2, startDate, endDate);
        if (response2.type === "success") {
            console.log("success")
            setPredData2(response2.data);

            const result = processData(response2.data);
            setDates2(result.dateList);
            setMetrics2(result.metricList);

            const result2 = processData(measuredData2.data.data);
            setMeasureDateList2(result2.dateList);
            setMeasuredMetricList2(result2.metricList);
        }

        // setPredData(dummy_data);
        // processData(dummy_data);
        setLoading(true);
    };

    const data: Data[] = [
        {
            name: dataSource1,
            x: dateList1,
            y: metricList1,
            mode: "lines+markers",
            line: { color: "orange" },
        },
        {
            name: dataSource1,
            x: measureDateList1,
            y: measuredMetricList1,
            mode: "lines+markers",
            line: { color: "orange" },
        },
        {
            name: dataSource2,
            x: dateList2,
            y: metricList2,
            mode: "lines+markers",
            line: { color: "green" },
        },
        {
            name: dataSource2,
            x: measureDateList2,
            y: measuredMetricList2,
            mode: "lines+markers",
            line: { color: "green" },
        }
    ];

    const layout: Partial<Layout> = {
        width: 1000,
        height: 500,
        margin: { t: 20, l: 40, r: 20, b: 40 },
        paper_bgcolor: "#fff",
        plot_bgcolor: "#fff",
        xaxis: {
          title: {
            text: "Time",
          },
          showgrid: false,
          zeroline: false
        },
        yaxis: {
          title: {
            text: "PM10",
          },
        },
        legend: {
            y: 0.5,
            // traceorder: "reversed",
            // yref: 'paper',
            font: {
                size: 16,
                family: 'OpenSans'
              },
        },
    };

    const config = {
        displayModeBar: false,
        responsive: true
    };

  return (
    <div className={css(styles.boardDefault)}>
      
      <label>model</label>
      <select value={modelName1} onChange={(e) => setModelName1(e.target.value)}>
        <option value="">Select an option</option>
        <option value="lstm">lstm</option>
        <option value="prophet">prophet</option>
      </select>

      <label>Station</label>
      <select value={dataSource1} onChange={(e) => {setDataSource1(e.target.value); setDataSourceId1((e.target.selectedIndex.toString()))}}>
        <option value="">Select an option</option>
        {Object.keys(stationList).map((key) => {
            return (
            <option key={key} value={stationList[key]}>
                {stationList[key]}
            </option>
            );
        })}
      </select>

    <label>model</label>
      <select value={modelName2} onChange={(e) => setModelName2(e.target.value)}>
        <option value="">Select an option</option>
        <option value="lstm">lstm</option>
        <option value="prophet">prophet</option>
      </select>

      <label>Station</label>
      <select value={dataSource2} onChange={(e) => {setDataSource2(e.target.value); setDataSourceId2((e.target.selectedIndex.toString()))}}>
        <option value="">Select an option</option>
        {Object.keys(stationList).map((key) => {
            return (
            <option key={key} value={stationList[key]}>
                {stationList[key]}
            </option>
            );
        })}
      </select>

      <div className={css(styles.timeFilterCont)}>
            <label>Start Date</label>
            <input type={"date"} name={"start-date"} value={startDate} onChange={(event) => handleDateChange(event, setStartDate)} className={css(styles.timeFilter)} />
            <label>End Date</label>
            <input type={"date"} name={"end-date"} value={endDate} onChange={(event) => handleDateChange(event, setEndDate)}  className={css(styles.timeFilter)}/>
        </div>


      <button onClick={(event) => getPredData(startDate, endDate)}>Get Predictions</button>

      
      
      {loading ? (
        <div className={css(styles.dsHeader)}>
          <Plot data={data} layout={layout} config={config} />
        </div>
      ) : null}



    </div>
  );
};

export default ComparePredictionPlots;

const styles = StyleSheet.create({
  boardDefault: {
    width: "100%",
    minHight: "100%",
    boxSizing: "border-box",
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
    width: "100%",
    padding: "2rem 4%",
    display: "flex",
    justifyContent: "space-between",
    boxSizing: "border-box",
    alignItems: "center",
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

    color: themeVars.colors.text.accentGrey,
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
