import {css, StyleSheet} from "aphrodite";
import themeVars from "../../util/themeVars";

const LogoHeader = () => {
    return ( <div className={css(styles.header)}> Air Life Goa</div>);
}

export default LogoHeader;

const styles = StyleSheet.create(
    {
        header: {
            width: '100%',
            fontSize: '3.2rem',
            fontWeight: 300,
            color: themeVars.colors.accent.dark2,
            padding: '1rem',
        }


    }
)
