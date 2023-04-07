import { StyleSheet, css } from "aphrodite";
import { useState, useEffect } from "react";
import themeVars from "../../util/themeVars";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

interface IdataItem {
  date: string;
  AQI: number;
}

interface IForTomorrowList {
  columnSize: number;
  AQIList: any;
}

const AQILastWeek = ({ columnSize, AQIList} :  IForTomorrowList) => {
  console.log("AQILIST2 : ", AQIList);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    console.log("AQILIST : ", AQIList);
    setData([
      { date: "17 Jan", AQI: AQIList[0] },
      { date: "18 Jan", AQI: AQIList[1] },
      { date: "19 Jan", AQI: AQIList[2] },
      { date: "20 Jan", AQI: AQIList[3] },
      { date: "21 Jan", AQI: AQIList[4] },
      { date: "22 Jan", AQI: AQIList[5] },
      { date: "23 Jan", AQI: AQIList[6] },
    ]);
  }, [AQIList]);

  const getColor = (value: number) => {
    if (value < 50) return themeVars.colors.alerts.green;
    if (value < 100) return themeVars.colors.alerts.yellow;
    return themeVars.colors.alerts.red;
  };

  const getText = (value: number) => {
    if (value < 25) return "Good";
    if (value < 50) return "Moderate";
    if (value < 100) return "Poor";
    if (value < 200) return "Unhealthy";
    return "Hazardous";
  };

  const value = 66;
  const colorStyle = buildStyles({
    trailColor: themeVars.colors.text.accentYellow,
    pathColor: themeVars.colors.accent.dark2,
    strokeLinecap: "butt",
  });
  const rowItem = (item: IdataItem, index: number) => {
    return (
      <div key={index} className={css(styles.forTomorrowListBodyRow)}>
        <div className={css(styles.forTomorrowListBodyRowLabel)}>
          {item.date}
        </div>
        <div className={css(styles.forTomorrowListBodyRowValue)}>
          {item.AQI}
        </div>
        <div
          className={css(styles.forTomorrowListBodyRowText)}
          style={{ color: getColor(item.AQI) }}
        >
          {getText(item.AQI)}
        </div>
      </div>
    );
  };

  return (
    <div className={css(styles.forTomorrowListDefault)}>
      <h3 className={css(styles.forTomorrowListHeaderDefault)}>
        AQI last week
      </h3>
      <div className={css(styles.forTomorrowListBodyDefault)}>
        <div className={css(styles.forTomorrowListBodyColumn)}>
          {data.slice(0, 7).map((item: any, index: number) => {
            return rowItem(item, index);
          })}
        </div>
        <div className={css(styles.progressBar)}>
          <CircularProgressbarWithChildren
            value={30}
            className={css(styles.progressCircle)}
            styles={colorStyle}
            strokeWidth={10}
          >
            <div className={css(styles.progressCircleText)}>
              <div className={css(styles.progressCircleTextValue)}>
                1/7 Days
              </div>
              <div className={css(styles.progressCircleTextUnit)}>
                <span>of fresh air</span>
              </div>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </div>
  );
};

export default AQILastWeek;

const styles = StyleSheet.create({
  forTomorrowListDefault: {
    width: "100%",
    height: "100%",
    padding: "1rem",
  },

  forTomorrowListHeaderDefault: {
    marginTop: "0.5rem",
    marginBottom: "2rem",
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

  forTomorrowListBodyItemDefault: {},

  forTomorrowListBodyColumn: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },

  forTomorrowListBodyRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    gap: "1rem",
  },

  forTomorrowListBodyRowLabel: {
    color: themeVars.colors.text.accentGrey,
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "1rem",
    letterSpacing: "1px",
    justifyContent: "flex-start",
  },

  forTomorrowListBodyRowText: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "1rem",
    display: "flex",
    justifyContent: "flex-start",
    textTransform: "capitalize",
  },

  forTomorrowListBodyRowValue: {
    color: themeVars.colors.text.accentGrey,
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "1rem",
    display: "flex",
    justifyContent: "flex-start",
    textTransform: "capitalize",
    width: "20%",
  },

  progressCircle: {
    width: "9rem",
    height: "9rem",
  },

  progressCircleText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  progressCircleTextValue: {
    fontSize: "1.3rem",
    fontWeight: 600,
    fontStyle: "normal",
    color: themeVars.colors.text.accentGrey,
    letterSpacing: "0.004rem",
  },

  progressCircleTextUnit: {
    fontSize: "0.8rem",
    fontWeight: 300,
    lineHeight: "0.7rem",
    color: themeVars.colors.text.accentGrey,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  progressBar: {
    width: "auto",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
