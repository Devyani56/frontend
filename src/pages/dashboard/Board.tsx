import {StyleSheet, css} from "aphrodite";
import themeVars from "../../util/themeVars";
import Card from "../../components/cards/Card";
import InfoSection from "./InfoSection";
import InfoContainer from "./InfoContainer";
import InfoSubSection from "./InfoSubSection";
import ChartSection from "./ChatSection";
import PMTiles from "./PMTiles";
import TilesContainer from "./TilesContainer";
import GasesTiles from "./GasesTiles";
import ThermoTile from "./ThermoTile";
import WindTile from "./WindTile";
import LowestHighestTile from "./LowestHighestTile";
import Map from "../common/Map";
import Modal from "../../components/modals/Modal";
import SigninSignup from "../auth/SigninSignup";
// import AgrigateRadial from "./AgrigateRadial";
import ForTomorrowList from "./ForTomorrowList";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import FilterSection from "./FilterSection";
import MainNavBar from "./MainNavBar";
import VerticalGap from "../../components/VerticalGap";
import useStore from "../../store/Store";
import {getFilteredDataApi} from "../../util/api/get-filtered-data";
import {getDashboardDataApi} from "../../util/api/get-dashboard-data-api";
import {getWindTempApi} from "../../util/api/get-wind-temp-api";
import {FrameCorners, X} from "phosphor-react";

interface IBoardProps {
    openSideDrawer: () => void;
}

interface IFilters {
    metric: string,
    duration: string,
    startDate: Date
    endDate: Date
}
const Board = ({openSideDrawer} : IBoardProps) => {
    const url = useLocation().pathname;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(url === "/signin" || url === "/signup");
    const user = useStore((state) => state.user);
    useEffect(() => {
        setShowModal(url === "/signin" || url === "/signup");
    }
    , [url]);

    const onCloseModal = () => {
        setShowModal(false);
        navigate("/");
    }

    const today = new Date();
    const tenYearsBack = new Date();
    tenYearsBack.setFullYear(today.getFullYear() - 10);
    const [filterOptions, setFilterOptions] = useState<IFilters>({metric: "All", duration: "Daily", endDate: today, startDate: tenYearsBack});

    const [location, setLocation] = useState({"sourceId": "", "sourceName": "", "sourceType": "", "sourceLat": 15.299326, "sourceLng": 74.123993, address: ""});

    const [data, setData] = useState([]);
    const [mainData, setMainData] = useState<any>({});

    const [wind, setWind] = useState(0);
    const [temp, setTemp] = useState(0);
    const getAndSetData = async () => {
        console.log("Locatio from getAndSetData", location)
        if (!location.sourceId) {
            return;
        }
        const response = await getFilteredDataApi(location.sourceId, filterOptions)
        if(response.type === "success") {
            setData(response.data.data);
        }
    }

    const getAndSetWindTemp = async () => {
        if (!location.sourceId) {
            return;
        }
        const response = await getWindTempApi(location.sourceId)
        if(response.type === "success") {
            // trim wind and temp to before decimal
            setWind(Math.floor(response.data.wind));
            setTemp(Math.floor(response.data.temp));
        }
    }



    const getAndSetMainData = async () => {
        if (!location.sourceId) {
            return;
        }
        const response = await getDashboardDataApi(location.sourceId)
        // reset main data
        setMainData({});

        if(response.type === "success") {
            setMainData(response.data);
            console.log("Main data", response.data)
        }

    }

    useEffect(() => {
        getAndSetData();
    }
    , [filterOptions, location]);

    useEffect(() => {
        getAndSetMainData();
    }, [location]);

    useEffect(() => {
        getAndSetWindTemp();
    }, [location]);

    const [fullMapOpen, setFullMapOpen] = useState(false);
    const openFullMap = () => {
        setFullMapOpen(true);
    }

    const closeFullMap = () => {
        setFullMapOpen(false);
    }

    return (
      <div className={css(styles.boardDefault)}>
          {fullMapOpen && <div className={css(styles.mapCont)}>
              <Map coordinate={[15.299326, 74.123993]} zoom={9}/>
              <button className={css(styles.closeBtn)} onClick={closeFullMap}>
                    <X size={32} weight="bold"/>
              </button>

          </div>}
          <Modal isOpen={showModal} onClose={onCloseModal}>
              <SigninSignup/>
          </Modal>
          <div className={css(styles.contentCont)}>
              <MainNavBar openSideDrawer={openSideDrawer} location={location} setLocation={setLocation}/>
              <VerticalGap gap={"2rem"}/>
              <FilterSection filterOptions={filterOptions} setFilterOptions={setFilterOptions}/>
              <ChartSection data={data}/>
              <InfoContainer>
                  <InfoSection>
                      <Card type={"cardDark"}  height={"12rem"}>
                          <TilesContainer gap={"5%"}>
                              <PMTiles value={(mainData.metrics && mainData.metrics!['PM25'] ) || "-"} unit={"ug/m3"} label={"PM2.5"} type={"dark"}/>
                              <PMTiles value={(mainData.metrics && mainData.metrics!['PM10'] ) || "-" } unit={"ug/m3"} label={"PM10"} type={"dark"}/>
                          </TilesContainer>
                      </Card>
                      <Card type={"cardDark"}  height={"23rem"}>
                          <LowestHighestTile high={mainData.high || {}} low={mainData.low || {}}/>
                      </Card>
                      <Card type={"cardDark"}  height={"15rem"}>
                          <ForTomorrowList columnSize={4} data={mainData.prediction}/>
                      </Card>
                      {/*<InfoSubSection>*/}
                      {/*    <Card type={"cardDark"} width={"50%"} height={"8rem"}/>*/}
                      {/*    <Card type={"cardDark"} width={"50%"} height={"8rem"}/>*/}
                      {/*</InfoSubSection>*/}
                  </InfoSection>

                  <InfoSection>
                      <Card type={"cardDark"}  height={"9.2rem"}>
                          <TilesContainer gap={"2%"}>
                              <GasesTiles value={(mainData.metrics && mainData.metrics!['O3'] ) || "-"} label={"O3"} type={"dark"}/>
                              <GasesTiles value={(mainData.metrics && mainData.metrics!['SO2'] ) || "-"} label={"SO2"} type={"dark"}/>
                              <GasesTiles value={(mainData.metrics && mainData.metrics!['NO2'] ) || "-"} label={"NO2"} type={"dark"}/>
                              <GasesTiles value={(mainData.metrics && mainData.metrics!['CO'] ) || "-"} label={"CO"} type={"dark"}/>
                          </TilesContainer>
                      </Card>

                      <Card type={"cardDark"}  height={"42rem"} padding={"0"}>
                          <Map coordinate={[15.299326, 74.123993]} zoom={9}/>
                          <button className={css(styles.fullMapBtn)} onClick={openFullMap}>
                              <FrameCorners size={32} />
                          </button>
                      </Card>
                      {/*<InfoSubSection>*/}
                      {/*    <Card type={"cardDark"} width={"60%"} height={"8rem"}/>*/}
                      {/*    <Card type={"cardDark"} width={"40%"} height={"8rem"}/>*/}
                      {/*</InfoSubSection>*/}
                  </InfoSection>

                  <InfoSection>
                      <InfoSubSection>
                          <Card type={"cardDark"} width={"50%"} height={"9.2rem"}>
                              <ThermoTile value={temp}/>
                          </Card>
                          <Card type={"cardDark"} width={"50%"} height={"9.2rem"}>
                              <WindTile value={wind}/>
                          </Card>
                      </InfoSubSection>
                      <Card type={"cardDark"} height={"33rem"} padding={"0"}>
                          <Map coordinate={[location.sourceLat, location.sourceLng]} zoom={11}/>
                          <button className={css(styles.fullMapBtn)} onClick={openFullMap}>
                              <FrameCorners size={32} />
                          </button>
                      </Card>
                      <Card type={"cardLight"} height={"12rem"}>
                         <div className={css(styles.aboutBox)}>
                             This website is a part of the IIT GOA Air Quality Monitoring Project. The project aims to provide real-time air quality data to the public. The data is collected from a network of air quality monitoring stations across the city of Goa.
                         </div>
                      </Card>
                  </InfoSection>
              </InfoContainer>
          </div>
      </div>

    );
};
export default Board;

const styles = StyleSheet.create(
    {
        boardDefault: {
            width: '100%',
            minHeight: '100%',
            background: `linear-gradient(122.84deg,
            ${themeVars.colors.mainBackground.light} 0%,
            ${themeVars.colors.mainBackground.dark} 77.78%)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            paddingTop: '2rem',
            paddingBottom: '2rem',
        },

        contentCont: {
            width: '90%',
            maxWidth: '1200px',
        },

        mapCont: {
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: 101,
        },

        closeBtn: {
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 1002,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
        },

        fullMapBtn: {
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            zIndex: 502,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: themeVars.colors.accent.darkGreen,
        },

        aboutBox: {
            width: '100%',
            height: '100%',
            padding: '1rem 0',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            fontSize: '1.2rem',
            color: themeVars.colors.text.accentGrey,

        }
    }
)
