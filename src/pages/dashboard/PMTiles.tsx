import { StyleSheet, css } from 'aphrodite';
import themeVars from "../../util/themeVars";
interface IPMTilesProps {
    value: number;
    unit: string;
    label: string;
    type?: "light" | "dark";
}
const PMTiles = ({value, unit, label, type} : IPMTilesProps) => {
    if (!type) {
        type = "light";
    }

    const customStyle = StyleSheet.create(
        {
            dark: {
                background: "rgba(47, 65, 81, 0.26)",
                boxShadow: "0px 4px 21px rgba(0, 0, 0, 0.01)",
                borderRadius: "12px",
            },
            light: {

            }
        }
    );

    return (
        <div className={css(styles.TilesDefault, customStyle[type])}>
            <div className={css(styles.valueAndUnit)}>
                <div className={css(styles.TilesValue)}>
                    {value}
                </div>
                <div className={css(styles.TilesUnit)}>
                    {unit}
                </div>
            </div>
            <div className={css(styles.TilesLabel)}>
                {label}
            </div>
        </div>
    );

}

export default PMTiles;


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
        },
        TilesValue: {
            fontWeight: 500,
            fontSize: "4rem",
            lineHeight: "2.4rem",
            letterSpacing: ".225753rem",
            textTransform: "uppercase",
            color: themeVars.colors.text.accentGrey,

        },
        TilesUnit: {
            color: themeVars.colors.text.accentGrey,
            fontStyle: "normal",
            fontWeight: 600,
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

        },


    }
)

