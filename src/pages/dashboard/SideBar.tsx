import { StyleSheet, css } from 'aphrodite';
import themeVars from "../../util/themeVars";
import Card from "../../components/cards/Card";
import SideBarInfoSection from "./SideBarInfoSection";
import AgrigateRadial from "./AgrigateRadial";
import GasesTiles from "./GasesTiles";
import TilesContainer from "./TilesContainer";
import ForTomorrowAQI from "./ForTomorrowAQI";
import PMTiles from "./PMTiles";
import AQILastWeek from "./AQILastWeek";
const SideBar = () => {
    return (
        <div className={css(styles.sideBarDefault)}>
            <SideBarInfoSection>
                <Card type={"cardLight"} height={"25rem"}  width={"70%"}>
                    <AgrigateRadial/>
                </Card>
                <Card type={"cardLight"} height={"12rem"}  width={"70%"}>
                    <TilesContainer gap={"5%"}>
                        <PMTiles value={60} unit={"ug/m3"} label={"PM2.5"} type={"light"}/>
                        <PMTiles value={120} unit={"ug/m3"} label={"PM10"} type={"light"}/>
                    </TilesContainer>
                </Card>
                <Card type={"cardLight"} height={"17rem"}  width={"70%"}>
                    <AQILastWeek columnSize={7}/>
                </Card>
                <Card type={"cardLight"} height={"auto"}  width={"70%"}>
                <ForTomorrowAQI columnSize={999}/>
                </Card>
                <Card type={"cardLight"} height={"7.7rem"} width={"70%"}>
                    <TilesContainer gap={"2%"}>
                        <GasesTiles value={8} label={"O3"} type={"light"}/>
                        <GasesTiles value={3} label={"SO2"} type={"light"}/>
                        <GasesTiles value={6} label={"NO2"} type={"light"}/>
                        <GasesTiles value={999} label={"CO"} type={"light"}/>
                    </TilesContainer>
                </Card>

            </SideBarInfoSection>
        </div>

    );
};

export default SideBar;

const styles = StyleSheet.create(
    {
        sideBarDefault: {
            backgroundColor: themeVars.colors.backgrounds.lightest,
            width: '100%',
            height: '100%',
        },


    }
)
