import { StyleSheet, css } from 'aphrodite';
import themeVars from "../../util/themeVars";
import Card from "../../components/cards/Card";
const SideBar = () => {
    return (
        <div className={css(styles.sideBarDefault)}>
            <Card type={"cardLight"} width={"20rem"} height={"15rem"}/>
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
