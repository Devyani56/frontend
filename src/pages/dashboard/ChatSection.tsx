import {css, StyleSheet} from "aphrodite";
import MyResponsiveLine from "./MyResponsiveLine";
import themeVars from "../../util/themeVars";
import Button from "../../components/buttons/Button";
import {CaretDown} from "phosphor-react";
import {useEffect, useRef, useState} from "react";
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
    const [mywidth, setWidth] = useState<number>(0);
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartContainerRef.current) {
            setWidth(chartContainerRef.current.offsetWidth * 0.95);
        }
    }, [chartContainerRef]);

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
        // give width based on parent container
        width: 900,
        height: 300,
        legend: {
            y: 0.5,
            // traceorder: "reversed",
            yref: 'paper',
            font: {
                color: 'white',
                size: 16,
                family: 'Arial'
              },
        },
        xaxis:{
            showgrid: false,
            zeroline: false

        },

        yaxis:{
            showgrid: true,
            zeroline: false,
            color: themeVars.colors.accent.green,
        //     grid line colors
            gridcolor: 'rgba(255, 255, 255, 0.2)',
        },
        plot_bgcolor: 'transparent', // Set background color to transparent
        paper_bgcolor: 'transparent' // Set paper color to transparent

        ,
      //   axis font color
        font: {
            color: 'rgba(255, 255, 255, 0.6)',
            size: 12,
        },
      //   no padding
        margin: {
            l: 35,
            r: 20,
            b: 35,
            t: 30,
        }
      //   thickness of the line in graph


      };
      
    const config = {
        displayModeBar: false,
        responsive: true,
    //     label color
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

    // use a ref on the chart container to get the width





    return (
        <div className={css(styles.chartSectionDefault)} ref={chartContainerRef}>
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
            top: "-30px",
            width: "100%",
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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
