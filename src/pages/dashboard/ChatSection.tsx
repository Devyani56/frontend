import {css, StyleSheet} from "aphrodite";
import MyResponsiveLine from "./MyResponsiveLine";
import themeVars from "../../util/themeVars";
import Button from "../../components/buttons/Button";
import {CaretDown} from "phosphor-react";
import {useEffect, useState} from "react";
import Plot from "react-plotly.js";
import  PlotParams from "react-plotly.js"
import   AxisType  from "react-plotly.js"
import Plotly from "plotly.js";
import { PlotData } from "plotly.js";

type chartDataType ={
    x: string[];
    y: number[];
    name: string,
    mode: any
}

const data = [
    {
        "id": "japan",
        "color": "hsl(260, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 116
            },
            {
                "x": "helicopter",
                "y": 118
            },
            {
                "x": "boat",
                "y": 158
            },
            {
                "x": "train",
                "y": 22
            },
            {
                "x": "subway",
                "y": 100
            },
            {
                "x": "bus",
                "y": 117
            },
            {
                "x": "car",
                "y": 243
            },
            {
                "x": "moto",
                "y": 71
            },
            {
                "x": "bicycle",
                "y": 275
            },
            {
                "x": "horse",
                "y": 209
            },
            {
                "x": "skateboard",
                "y": 271
            },
            {
                "x": "others",
                "y": 86
            }
        ]
    },
    {
        "id": "france",
        "color": "hsl(227, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 270
            },
            {
                "x": "helicopter",
                "y": 255
            },
            {
                "x": "boat",
                "y": 76
            },
            {
                "x": "train",
                "y": 117
            },
            {
                "x": "subway",
                "y": 184
            },
            {
                "x": "bus",
                "y": 54
            },
            {
                "x": "car",
                "y": 171
            },
            {
                "x": "moto",
                "y": 15
            },
            {
                "x": "bicycle",
                "y": 137
            },
            {
                "x": "horse",
                "y": 238
            },
            {
                "x": "skateboard",
                "y": 201
            },
            {
                "x": "others",
                "y": 119
            }
        ]
    },
    {
        "id": "us",
        "color": "hsl(312, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 175
            },
            {
                "x": "helicopter",
                "y": 190
            },
            {
                "x": "boat",
                "y": 47
            },
            {
                "x": "train",
                "y": 196
            },
            {
                "x": "subway",
                "y": 132
            },
            {
                "x": "bus",
                "y": 182
            },
            {
                "x": "car",
                "y": 232
            },
            {
                "x": "moto",
                "y": 16
            },
            {
                "x": "bicycle",
                "y": 60
            },
            {
                "x": "horse",
                "y": 80
            },
            {
                "x": "skateboard",
                "y": 217
            },
            {
                "x": "others",
                "y": 50
            }
        ]
    },
    {
        "id": "germany",
        "color": "hsl(319, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 154
            },
            {
                "x": "helicopter",
                "y": 199
            },
            {
                "x": "boat",
                "y": 60
            },
            {
                "x": "train",
                "y": 36
            },
            {
                "x": "subway",
                "y": 90
            },
            {
                "x": "bus",
                "y": 100
            },
            {
                "x": "car",
                "y": 30
            },
            {
                "x": "moto",
                "y": 216
            },
            {
                "x": "bicycle",
                "y": 199
            },
            {
                "x": "horse",
                "y": 147
            },
            {
                "x": "skateboard",
                "y": 94
            },
            {
                "x": "others",
                "y": 115
            }
        ]
    },
    {
        "id": "norway",
        "color": "hsl(63, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 257
            },
            {
                "x": "helicopter",
                "y": 25
            },
            {
                "x": "boat",
                "y": 114
            },
            {
                "x": "train",
                "y": 143
            },
            {
                "x": "subway",
                "y": 97
            },
            {
                "x": "bus",
                "y": 284
            },
            {
                "x": "car",
                "y": 169
            },
            {
                "x": "moto",
                "y": 116
            },
            {
                "x": "bicycle",
                "y": 103
            },
            {
                "x": "horse",
                "y": 80
            },
            {
                "x": "skateboard",
                "y": 36
            },
            {
                "x": "others",
                "y": 14
            }
        ]
    }
]
const ChartSection = ({data} : any) => {
    console.log("From chart section - data :", data)

    //  data will be something like this
    //  [
    //     {
    //         "recordedAt" : "2021-05-01",
    //         "data" : {
    //             "NO2" : 100,
    //             "O3" : 200,
    //             "SO2" : 300,
    //             "CO" : 400,
    //         }
    //     },
    //     { ... },
    //     { ... },
    //   ...
    //   ]

    // create a data field in the chart data format
    // const [chartData, setChartData] = useState<any>([])
    var [chartData, setChartData] = useState<chartDataType[]>([]);
    var dummydata: any = [];

    const prettyDate = (date : string) => {
        const dateObj = new Date(date)
        // use short form of month
        const month = dateObj.toLocaleString('default', { month: 'short' })
        const day = dateObj.getDate()
        const year = dateObj.getFullYear()
        return `${month} ${day}`

    }
    const colors  = ["hsl(312, 70%, 50%)", "hsl(319, 70%, 50%)", "hsl(63, 70%, 50%)", "hsl(63, 70%, 50%)"]
    // const parseDataForChart = (data : any) => {
    //     const dataByFields : any = {}

    //     if (!data || data.length === 0) {
    //         console.log("No data to parse")
    //         return
    //     }

    //     for (let i = 0; i < data.length; i++) {
    //         const record = data[i]
    //         const recordedAt = record.recordedAt
    //         const recordData = record.data

    //         console.log("recordedAt :", recordedAt)
    //         console.log("recordData :", recordData)

    //         for (const key in recordData) {
    //             // if key is not present in dataByFields, create it
    //             if (!dataByFields[key]) {
    //                 dataByFields[key] = []
    //             }
    //             if(recordData[key] === null){
    //                 continue
    //             }
    //             dataByFields[key].push({
    //                 x: recordedAt,
    //                 y: recordData[key]
    //             })
    //         }
    //     }
    //     console.log("dataByFields :", dataByFields)

    //     // asign value to chart data
    //     const convertedData = Object.keys(dataByFields).map((key : any) => {
    //         return {
    //             id: key,
    //             color: colors[Math.floor(Math.random() * colors.length)],
    //             data: dataByFields[key]
    //         }
    //     })
    //     console.log("convertedData :", convertedData)
    //     setChartData(convertedData)
    // }
    const layout = {
        width: 1000,
        height: 350,
        legend: {
            y: 0.5,
            // traceorder: "reversed",
            yref: 'paper',
            font: {
                color: '#e6fa84',
                size: 16,
                family: 'Arial'
              },
        },
        xaxis:{
            showgrid: false,
            zeroline: false
        },
        plot_bgcolor: 'transparent', // Set background color to transparent
        paper_bgcolor: 'transparent' // Set paper color to transparent
      };
      
    const config = {
    displayModeBar: false,
    responsive: true
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
            mode: "lines+markers",
            line: {
                width: 3
            },
            x: datesData,
            y: dataByFields[key].map((obj:{y:number}) => obj.y),
          };
        });
        console.log("convertedData :", convertedData);
        // setChartData(convertedData);
    
        return convertedData;
      };
    
    useEffect(() => {
        setChartData(parseDataForChart(data));
    }
    , [data])


    return (
        <div className={css(styles.chartSectionDefault)}>
            {/* <MyResponsiveLine data={chartData}/> */}
            <Plot data={chartData} layout={layout} config={config} />
        </div>
    );
};

export default ChartSection;

const styles = StyleSheet.create(
    {

        chartSectionDefault: {
            backgroundColor: "transparent",
            height: "28rem",
            top: "-30px"
        },

        chartContainer: {
            width: "100%",
            height: "30rem",

        },

        chartFiltersLocationCont: {
            width: "100%",
            height: "5rem",
            display: 'flex',
            justifyContent: 'space-between'

        },

        statsForCont: {
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "1.6rem",
            lineHeight: "2rem",
            color: themeVars.colors.text.accentGrey
        },

        FilterCont: {
            backgroundColor: 'green',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 2fr'
        },

        Filter: {

        },

        Interval: {

        },

        DateRange: {

        },
        generalButton: {

        }
    }
)
