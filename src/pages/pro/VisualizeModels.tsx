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

type PredictionData = {
  recordedAt: string;
  data: { PM10: number };
};

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

const VisualizeModels = () => {
  const [modelName, setModelName] = useState("");
  const [dataSourceId, setDataSourceId] = useState("");
  const [dropdown3Value, setDropdown3Value] = useState("");
  const [loading, setLoading] = useState(false);

  var [predData, setPredData] = useState<PredictionData[]>([]);
  var [dateList, setDates] = useState<string[]>([]);
  var [metricList, setMetrics] = useState<number[]>([]);
  var [rawdata, setRawData] = useState("");
  var [chartData, setChartData] = useState<chartDataType[]>([]);

  // const getpreds = () => {};

  var dummydata: any = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 4, 9, 16, 25],
    name: 'Line 1',
    type: 'scatter',
  }];

  const processData = (data: PredictionData[]) => {
    const dateList = data.map((item) => item.recordedAt);
    const metricList = data.map((item) => item.data.PM10);
    setDates(dateList);
    setMetrics(metricList);
  };

  const parseDataForChart = (data: any): chartDataType[] => {
    const dataByFields: any = {};
    var datesData: any = [];

    if (!data || data.length === 0) {
      console.log("No data to parse");
      return dummydata;
    }

    for (let i = 0; i < data.length; i++) {
      const record = data[i];
      const recordedAt = record.recordedAt;
      const recordData = record.data;

    //   console.log("recordedAt :", recordedAt);
    //   console.log("recordData :", recordData);
      datesData.push(recordedAt);

      for (const key in recordData) {
        // if key is not present in dataByFields, create it
        if (!dataByFields[key]) {
          dataByFields[key] = [];
        }
        // if (recordData[key] === null) {
        //   continue;
        // }
        dataByFields[key].push({
          y: recordData[key],
        });
      }
    }
    console.log("dataByFields :", dataByFields);

    // asign value to chart data
    const convertedData = Object.keys(dataByFields).map((key: any) => {
      return {
        name: key,
        type: 'line',
        x: datesData,
        y: dataByFields[key].map((obj:{y:number}) => obj.y),
      };
    });
    console.log("convertedData :", convertedData);
    // setChartData(convertedData);

    return convertedData;
  };

  const getPredData = async () => {
    // const response = await getPredictionDataApi(dataSourceId, modelName);
    // if (response.type === "success") {
    // setPredData(response.data);
    // processData(response.data);
    // }
    // setPredData(dummy_data);
    // processData(dummy_data);
    // setLoading(true);
    const response = await getFilteredDataApi("5");
    if (response.type === "success") {
      setRawData(response.data.data);
      console.log("rawdata ",rawdata);
      setChartData(parseDataForChart(rawdata));
    }
    setLoading(true);
  };


  const layout = {
    plot_bgcolor: 'transparent', // Set background color to transparent
    paper_bgcolor: 'transparent' // Set paper color to transparent
  };
  
  const config = {
    displayModeBar: true,
    responsive: true
  };

  return (
    <div className={css(styles.boardDefault)}>
      <label>model</label>
      <select value={modelName} onChange={(e) => setModelName(e.target.value)}>
        <option value="">Select an option</option>
        <option value="option1">lstm</option>
        <option value="option2">prophet</option>
      </select>

      <label>DataSourceId:</label>
      <input
        type="text"
        value={dataSourceId}
        onChange={(e) => setDataSourceId(e.target.value)}
      />

      <button onClick={getPredData}>Get Predictions</button>

      {loading ? (
        <div className={css(styles.dsHeader)}>
          <Plot data={chartData} layout={layout} config={config} />
        </div>
      ) : null}
    </div>
  );
};

export default VisualizeModels;

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
});
