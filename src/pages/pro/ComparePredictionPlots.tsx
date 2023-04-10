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
import { getMetricDataApi } from "../../util/api/get-metric-data";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PredictionDataHistoric = {
  recordedAt: string;
  metric: number;
};

type PredictionDataPreds = {
  recordedAt: string;
  data: any;
};

interface StationMapping {
  [key: string]: string;
}

type chartDataType = {
  x: string[];
  y: number[];
  type: any;
  name: string;
  mode: string;
  line: {
    color: string;
  };
};

const ComparePredictionPlots = () => {
  const [modelName1, setModelName1] = useState("");
  const [modelName2, setModelName2] = useState("");

  const [dataSourceId1, setDataSourceId1] = useState("");
  const [dataSource1, setDataSource1] = useState("");

  const [dataSourceId2, setDataSourceId2] = useState("");
  const [dataSource2, setDataSource2] = useState("");

  const [loading, setLoading] = useState(false);

  var [predData1, setPredData1] = useState<PredictionDataPreds[]>([]);
  var [predData2, setPredData2] = useState<PredictionDataPreds[]>([]);

  var [metric, setMetric] = useState("");

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

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    func: any
  ) => {
    func(event.target.value);
    console.log(typeof startDate);
  };

  // const getpreds = () => {};
  useEffect(() => {
    async function getStaionMappings() {
      try {
        const datasourcemapping = await getDataSourceMappingAPi();
        setStationList(datasourcemapping.data);
        console.log(datasourcemapping);
      } catch (error) {
        setStationList({});
      }
    }
    getStaionMappings();
    console.log(stationList);
  }, []);

  const processDataHistoric = (data: PredictionDataHistoric[]) => {
    console.log("indise preprocess =>", data);
    const dateList = data.map((item) => item.recordedAt);
    const metricList = data.map((item) => item.metric);
    // setDates(dateList);
    // setMetrics(metricList);
    return { dateList: dateList, metricList: metricList };
  };

  const processDataPreds = (data: PredictionDataPreds[]) => {
    console.log("indise preprocess =>", data);
    const dateList = data.map((item) => item.recordedAt);
    const metricList = data.map((item) => item.data[metric]);
    // setDates(dateList);
    // setMetrics(metricList);
    return { dateList: dateList, metricList: metricList };
  };

  const getPredData = async (date1: string, date2: string, metric: string) => {
    var startDate = new Date(Date.parse(date1));
    var endDate = new Date(Date.parse(date2));

    const measuredData1 = await getMetricDataApi(dataSourceId1, metric);

    console.log("measured data 1 => ", measuredData1.data, dataSourceId1);
    const response1 = await getPredictionDataApi(
      dataSourceId1,
      modelName1,
      startDate,
      endDate
    );
    if (response1.type === "success") {
      console.log("success");
      setPredData1(response1.data);

      const result = processDataPreds(response1.data);
      console.log("results :", result);
      setDates1(result.dateList);
      setMetrics1(result.metricList);

      const result2 = processDataHistoric(measuredData1.data.data);
      setMeasureDateList1(result2.dateList);
      setMeasuredMetricList1(result2.metricList);
    }

    const measuredData2 = await getMetricDataApi(dataSourceId2, metric);

    console.log("measured data 2 => ", measuredData2.data.data);
    const response2 = await getPredictionDataApi(
      dataSourceId2,
      modelName2,
      startDate,
      endDate
    );
    if (response2.type === "success") {
      console.log("success");
      setPredData2(response2.data);

      const result = processDataPreds(response2.data);
      setDates2(result.dateList);
      setMetrics2(result.metricList);

      const result2 = processDataHistoric(measuredData2.data.data);
      setMeasureDateList2(result2.dateList);
      setMeasuredMetricList2(result2.metricList);
    }

    // setPredData(dummy_data);
    // processData(dummy_data);
    setLoading(true);
  };

  const data: Data[] = [
    {
      name: dataSource1 + " Prediction Data",
      x: dateList1,
      y: metricList1,
      mode: "lines+markers",
      line: { color: "red" },
    },
    {
      name: dataSource1 + " Historical Data",
      x: measureDateList1,
      y: measuredMetricList1,
      mode: "lines+markers",
      line: { color: "orange" },
    },
    {
      name: dataSource2 + " Prediction Data",
      x: dateList2,
      y: metricList2,
      mode: "lines+markers",
      line: { color: "blue" },
    },
    {
      name: dataSource2 + " Historical Data",
      x: measureDateList2,
      y: measuredMetricList2,
      mode: "lines+markers",
      line: { color: "green" },
    },
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
      zeroline: false,
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
        family: "OpenSans",
      },
    },
  };

  const config = {
    displayModeBar: false,
    responsive: true,
  };

  return (
    <div className={css(styles.boardDefault)}>
      {/* <label>model</label>
      <select
        value={modelName1}
        onChange={(e) => setModelName1(e.target.value)}
      >
        <option value="">Select an option</option>
        <option value="lstm">lstm</option>
        <option value="prophet">prophet</option>
      </select> */}

      {/* <label>Station</label> */}
      {/* <select
        value={dataSource1}
        onChange={(e) => {
          setDataSource1(e.target.value);
          setDataSourceId1(e.target.selectedIndex.toString());
        }}
      > */}
      <div className={css(styles.predictionSelectCont)}>
        <div className={css(styles.leftStation)}>
          <div className={css(styles.modelSelector)}>
            <select
              className={css(styles.modeSelect)}
              value={modelName1}
              onChange={(e) => setModelName1(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="lstm">lstm</option>
              <option value="prophet">prophet</option>
            </select>
          </div>

          <select
            className={css(styles.modeSelect)}
            value={dataSource1}
            onChange={(e) => {
              setDataSource1(e.target.value);
              setDataSourceId1(e.target.selectedIndex.toString());
            }}
          >
            <option value="">Select an option</option>
            {Object.keys(stationList).map((key) => {
              return (
                <option key={key} value={stationList[key]}>
                  {stationList[key]}
                </option>
              );
            })}
          </select>
        </div>
        <div className={css(styles.rightStation)}>
          <select
            className={css(styles.modeSelect)}
            value={modelName2}
            onChange={(e) => setModelName2(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="lstm">lstm</option>
            <option value="prophet">prophet</option>
          </select>

          <select
            className={css(styles.modeSelect)}
            value={dataSource2}
            onChange={(e) => {
              setDataSource2(e.target.value);
              setDataSourceId2(e.target.selectedIndex.toString());
            }}
          >
            <option value="">Select an option</option>
            {Object.keys(stationList).map((key) => {
              return (
                <option key={key} value={stationList[key]}>
                  {stationList[key]}
                </option>
              );
            })}
          </select>
        </div>

        <select
          value={metric}
          onChange={(e) => {
            setMetric(e.target.value);
          }}
        >
          <option value="">Select an option</option>
          <option value="PM10">PM10</option>
          <option value="NO2">NO2</option>
          <option value="SO2">SO2</option>
          <option value="O3">O3</option>
          <option value="CO">CO</option>
          <option value="Pb">Pb</option>
        </select>

        <div className={css(styles.timeFilterCont)}>
          <input
            type={"date"}
            name={"start-date"}
            value={startDate}
            onChange={(event) => handleDateChange(event, setStartDate)}
            className={css(styles.timeFilter)}
          />
          <input
            type={"date"}
            name={"end-date"}
            value={endDate}
            onChange={(event) => handleDateChange(event, setEndDate)}
            className={css(styles.timeFilter)}
          />
        </div>

        <button
          className={css(styles.getPredBtn)}
          onClick={(event) => getPredData(startDate, endDate, metric)}
        >
          Get Predictions
        </button>
      </div>

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
    borderRadius: "7.4rem",
    border: "1px solid " + themeVars.colors.accent.green,
    minHeight: "50rem",
    marginTop: "3rem",
  },

  leftStation: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "1rem",
  },

  modeSelect: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
    outline: "none",
    textDecoration: "underline",
    width: "14rem",
  },

  rightStation: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "1rem",
  },

  modelSelector: {},

  getPredBtn: {
    background: themeVars.colors.alerts.green,
    color: "white",
    fontSize: "1.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "2rem",
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

  predictionSelectCont: {
    width: "100%",
    boxSizing: "border-box",
    background: themeVars.colors.accent.green,
    borderRadius: "6rem",
    padding: "2rem 4%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5rem",
    borderBottomRightRadius: "0",
    borderBottomLeftRadius: "0",
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

  timeFilterCont: {},

  timeFilter: {
    width: "10rem",
    height: "3.2rem",
    border: "none",
    padding: "0 1rem",
    borderRadius: "2rem",

    ":first-child": {
      borderRadius: "2rem 0 0 2rem",
      borderRight: "0.5px solid rgba(256, 256, 256, 0.08)",
    },

    ":last-child": {
      borderRadius: "0 2rem 2rem 0",
    },

    color: "white",
    fontSize: "1rem",
    fontWeight: 600,
    letterSpacing: "0.065em",

    background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%23fff' d='M10 13.414l-6.707-6.707 1.414-1.414L10 10.586l5.293-5.293 1.414 1.414z'/></svg>") no-repeat right 0.75rem center/9px 9px`,
    backgroundColor: "rgba(0, 0, 0, 0.08)",

    ":focus": {
      outline: "none",
    },

    //     remove the date picker icon
    "::-webkit-calendar-picker-indicator": {
      opacity: 0,
    },
  },
});
