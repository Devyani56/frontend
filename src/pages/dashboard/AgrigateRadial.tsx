import { useState, useEffect } from "react";
import { StyleSheet, css } from 'aphrodite';
import {buildStyles, CircularProgressbarWithChildren} from "react-circular-progressbar";
import themeVars from "../../util/themeVars";

interface IForTomorrowList {
    PM10: number;
  }

const AgrigateRadial = ({ PM10} :  IForTomorrowList) => {

    const [value, setValue] = useState<any>(0);
    // const [AQI, setAQI] = useState<any>(0);

    const calculateAQI = (value: number) => {
        if (value <= 50 && value >= 0) return value;
        if (value <= 100 && value >= 51) return value;
        if (value <= 250 && value >= 101) return value*(200-101)/(250-101);
        if (value <= 350 && value >= 251) return value*(300-201)/(350-251);
        if (value <= 430 && value >= 351) return value*(400-301)/(430-351);
        if (value >= 430) return value*(500-401)/430;
        return value;
    };


    useEffect(() => {
        console.log("AQILIST : ", PM10);
        setValue(calculateAQI(PM10))
    }, [PM10]);


    // const value = 330;
    const colorStyle = buildStyles(
        {
            trailColor: themeVars.colors.text.accentYellow,
            pathColor: value < 100 ? themeVars.colors.alerts.green : value < 200 ? themeVars.colors.alerts.yellow : themeVars.colors.alerts.red,
        }
    );
    return (
        <div className={css(styles.forTomorrowListDefault)}>
            <h3 className={css(styles.forTomorrowListHeaderDefault)}>
                Live AQI
            </h3>
            <div className={css(styles.progressBar)}>
                <CircularProgressbarWithChildren
                    value={30}
                    className={css(styles.progressCircle)}
                    styles={colorStyle}
                    strokeWidth={14}
                >
                    <div className={css(styles.progressCircleText)}>

                        <div className={css(styles.progressCircleTextValue)}>
                            {value}
                        </div>
                        <div className={css(styles.progressCircleTextCondition)}>
                            Moderate
                        </div>

                    </div>
                </CircularProgressbarWithChildren>
            </div>
        </div>
    )
}

export default AgrigateRadial

const styles = StyleSheet.create(
    {
        forTomorrowListDefault: {
            width: "100%",
            height: "100%",
            padding: "1rem",

        },

        forTomorrowListHeaderDefault: {
            marginTop: "0.5rem",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "1.2rem",
            lineHeight: "1.2rem",
            letterSpacing: "0.055em",
            color: themeVars.colors.text.accentGrey,

        },

        forTomorrowListBodyDefault: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },

        forTomorrowListBodyItemDefault: {
        },

        forTomorrowListBodyColumn: {
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: "0.8rem",

        },

        forTomorrowListBodyRow: {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            borderBottom: `1px solid ${themeVars.colors.others.borderGrey}`,
            padding: "0 0",

        },

        forTomorrowListBodyRowLabel: {
            color: themeVars.colors.text.accentGrey,
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "1rem",
            letterSpacing: "1px",

        },

        forTomorrowListBodyRowValue: {
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "1.2rem",
            display: "flex",
            textTransform: "capitalize",
        },

        progressCircle: {
            width: '18rem',
            height: '18rem',
        },

        progressCircleText: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        progressCircleTextValue: {
            fontSize: '4rem',
            fontWeight: 500,
            fontStyle: "normal",
            lineHeight: "3rem",
            color: themeVars.colors.text.accentGrey,
            letterSpacing: "0.225753rem",
        },

        progressCircleTextUnit: {
            fontSize: '1.5rem',
            fontWeight: 300,
            color: themeVars.colors.text.accentGrey,

        },


        progressBar: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },

        progressCircleTextCondition: {
            fontSize: '1.5rem',
            fontWeight: 300,
            color: themeVars.colors.text.accentGrey,

        }

    }
)
