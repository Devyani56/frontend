import {ThermometerSimple} from "phosphor-react";
import {StyleSheet, css} from "aphrodite";
import themeVars from "../../util/themeVars";

interface IThermoTileProps {
    value: number;
}
const ThermoTile = ({value}:IThermoTileProps) => {
    return (
        <div className={css(styles.TilesDefault)}>
            <ThermometerSimple className={css(styles.TilesIcon)} size={38}/>
            <div className={css(styles.valueAndUnit)}>
                <div className={css(styles.TilesValue)}>
                    {value}
                    <div className={css(styles.degreeSign)}></div>
                </div>
                <div className={css(styles.TilesUnit)}>
                    C
                </div>
            </div>
        </div>
    );
}

export default ThermoTile;


const styles = StyleSheet.create(

    {
        TilesDefault: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: '2rem 0.6rem',
            position: 'relative',
        },
        TilesValue: {
            fontWeight: 500,
            fontSize: "4rem",
            lineHeight: "2.4rem",
            letterSpacing: ".225753rem",
            textTransform: "uppercase",
            color: themeVars.colors.text.accentGrey,
            position: 'relative',

        },
        TilesUnit: {
            color: themeVars.colors.text.accentGrey,
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "1.2rem",
            lineHeight: "1.2rem",
            letterSpacing: "-0.02em",
        },
        TilesLabel: {
            color: themeVars.colors.text.accentGrey,
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "1.8rem",
            lineHeight: "3rem",
            letterSpacing: "-0.024247rem",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

        },
        valueAndUnit: {
            display: 'flex',
            flexDirection: 'row',
            gap: '0.1rem',
            alignItems: 'flex-end',
            marginLeft: '2rem',

        },

        TilesIcon: {
            color: themeVars.colors.text.accentGrey,
            position: 'absolute',
            top: '2rem',
            left: '0.3rem',
        },
        degreeSign: {
            position: 'absolute',
            top: '-1.5rem',
            right: '-0.1rem',
            width: '0.7rem',
            height: '0.7rem',
            borderRadius: '50%',
            backgroundColor: "transparent",
            border: '0.2rem solid ' + themeVars.colors.text.accentGrey,
        }

    }
)
