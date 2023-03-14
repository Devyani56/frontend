import themeVars from "../../util/themeVars";

import {StyleSheet, css} from "aphrodite";
import Plot from 'react-plotly.js';

// import { AxisType } from 'plotly.js';
import Plotly from "plotly.js";
// import Plotly from 'plotly.js-dist';
import { PlotData } from 'plotly.js';

import {useEffect, useState} from "react";
import Button from "../../components/buttons/Button";
import {Plus} from "phosphor-react";
import sensorBoxImg from "../../assets/images/station-box.png";


const VisualizeModels = () => {
    
    const data = [
        {
          x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          mode: "lines",
        },
      ];
      const layout = { title: "Chart Title" };
  
    return (
        <div className={css(styles.boardDefault)}>
            <div className={css(styles.dsHeader)}>
                <div className={css(styles.titleHeader)}>
                   Data Sources
                </div>
                <Plot data={data} layout={layout} config={{displayModeBar: true}} />
            </div>
        </div>
    );
}

export default VisualizeModels;


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
