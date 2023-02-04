import {css, StyleSheet} from "aphrodite";
import themeVars from "../../util/themeVars";

const LogoHeader = () => {
    return ( <div className={css(styles.header)}>
        <span className={css(styles.airlife)}>AirLife</span>
        <span className={css(styles.goa)}>GOA</span>
    </div>);
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
        },

        airlife: {
            backgroundColor: themeVars.colors.accent.darkGreen,
            padding: '0.4rem 0.6rem',
            color: '#fff',
            borderRadius: '0.4rem 0 0 0.4rem',
        },

        goa: {
            color: themeVars.colors.alerts.red,
            border: `2px solid ${themeVars.colors.alerts.red}`,
            padding: '0.2rem 0.4rem',
            borderRadius: '0 0.4rem 0.4rem 0',
            fontWeight: 600,
            borderLeft: 'none',

        }


    }
)
