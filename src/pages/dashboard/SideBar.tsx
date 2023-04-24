import { StyleSheet, css } from "aphrodite";
import themeVars from "../../util/themeVars";
import Card from "../../components/cards/Card";
import SideBarInfoSection from "./SideBarInfoSection";
import AgrigateRadial from "./AgrigateRadial";
import GasesTiles from "./GasesTiles";
import TilesContainer from "./TilesContainer";
import ForTomorrowAQI from "./ForTomorrowAQI";
import PMTiles from "./PMTiles";
import AQILastWeek from "./AQILastWeek";
import LogoHeader from "./LogoHeader";
import LocationSelector from "./LocationSelector";
import { getCapitalDataAPi } from "../../util/api/get-capital-data-api";
import VerticalGap from "../../components/VerticalGap";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [AQI, setAQI] = useState<Array<number>>([10, 11, 12, 13, 14, 15, 16]);
  const [metric, setMetrics] = useState<any>({
    CO: 15,
    O3: 10,
    SO2: 11,
    NO2: 13,
    PM10: 78,
    PM25: 46,
  });
  const [forecastForTomorrow, setForecastForTomorrow] = useState<any>({
    PM10: 55,
    PM25: 45,
    O3: 4,
    CO: 5,
    SO2: 14,
    NO2: 17,
  });

  // metric =
  const getCapData = async () => {
    const response = await getCapitalDataAPi();
    console.log("measured data => ", response.data);
    if (response.type === "success") {
      console.log("success");
      setAQI(response.data.AQI);
      console.log("ibnbstuta--", response.data.AQI);
      setMetrics(response.data.data);
      setForecastForTomorrow(response.data.forecastForTomorrow);
    }
    // console.log("capital data", response);
    // console.log("capital data", metric, AQI, forecastForTomorrow);
  };

  useEffect(() => {
    getCapData();
  }, []);

  console.log("capital data out", metric);

  return (
    <div className={css(styles.sideBarDefault)}>
      <SideBarInfoSection>
        <LogoHeader />
        <VerticalGap gap={"2rem"} />
        <Card type={"cardLight"} height={"25rem"} width={"100%"}>
          <AgrigateRadial PM10={metric.PM10}/>
        </Card>
        <Card type={"cardLight"} height={"12rem"} width={"100%"}>
          <TilesContainer gap={"5%"}>
            <PMTiles
              value={metric["PM25"]}
              unit={"ug/m3"}
              label={"PM2.5"}
              type={"light"}
            />
            <PMTiles
              value={metric.PM10}
              unit={"ug/m3"}
              label={"PM10"}
              type={"light"}
            />
          </TilesContainer>
        </Card>
        <Card type={"cardLight"} height={"17rem"} width={"100%"}>
          <AQILastWeek columnSize={7} AQIList={AQI} />
        </Card>
        <Card type={"cardLight"} height={"auto"} width={"100%"}>
          <ForTomorrowAQI columnSize={999} data={forecastForTomorrow} />
        </Card>
        <Card type={"cardLight"} height={"7.7rem"} width={"100%"}>
          <TilesContainer gap={"2%"}>
            <GasesTiles value={metric["O3"]} label={"O3"} type={"light"} />
            <GasesTiles value={metric.SO2} label={"SO2"} type={"light"} />
            <GasesTiles value={metric.NO2} label={"NO2"} type={"light"} />
            <GasesTiles value={metric.CO} label={"CO"} type={"light"} />
          </TilesContainer>
        </Card>
      </SideBarInfoSection>
    </div>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  sideBarDefault: {
    backgroundColor: themeVars.colors.backgrounds.lightest,
    width: "100%",
    height: "100%",
    paddingTop: "1rem",
    boxSizing: "border-box",
  },
  header: {
    width: "100%",
    fontSize: "3.2rem",
    fontWeight: 300,
    color: themeVars.colors.accent.dark2,
    padding: "1rem",
  },
});
