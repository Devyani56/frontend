import { StyleSheet, css } from 'aphrodite';
import themeVars from "../../util/themeVars";

interface IdataItem {
    label: "PM2.5" | "PM10" | "O3" | "SO2" | "NO2" | "CO",
    value: number
}

interface IForTomorrowList {
    columnSize: number
}
const ForTomorrowList = ({columnSize}: IForTomorrowList) => {
    const data: IdataItem[]= [{label:"PM2.5", value: 20}, {label:"PM10" , value: 50}, {label:"O3" , value: 8}, {label:"SO2" , value: 3}, {label:"NO2" , value: 2}, {label:"CO" , value: 99}]
    const getColor = (label: string, value: number) => {
        switch (label) {
            case "PM2.5":
                if (value < 25) return themeVars.colors.alerts.green
                if (value < 50) return themeVars.colors.alerts.yellow
                return themeVars.colors.alerts.red
            case "PM10":
                if (value < 50) return themeVars.colors.alerts.green
                if (value < 100) return themeVars.colors.alerts.yellow
                return themeVars.colors.alerts.red
            case "O3":
                if (value < 6) return themeVars.colors.alerts.green
                if (value < 8) return themeVars.colors.alerts.yellow
                return themeVars.colors.alerts.red
            case "SO2":
                if (value < 3) return themeVars.colors.alerts.green
                if (value < 6) return themeVars.colors.alerts.yellow
                return themeVars.colors.alerts.red
            case "NO2":
                if (value < 3) return themeVars.colors.alerts.green
                if (value < 6) return themeVars.colors.alerts.yellow
                return themeVars.colors.alerts.red
            case "CO":
                if (value < 3) return themeVars.colors.alerts.green
                if (value < 6) return themeVars.colors.alerts.yellow
                return themeVars.colors.alerts.red
            default:
                return themeVars.colors.alerts.green
        }
    }
    const rowItem = (item : IdataItem, index : number) => {
        return (
            <div key={index} className={css(styles.forTomorrowListBodyRow)}>
                <div className={css(styles.forTomorrowListBodyRowLabel)}>
                    {item.label}
                </div>
                    <div className={css(styles.forTomorrowListBodyRowValue)}
                         style={{color:getColor(item.label, item.value)}}>
                        {item.value}
                    </div>
            </div>
        )
    }

    return (
        <div className={css(styles.forTomorrowListDefault)}>
            <h3 className={css(styles.forTomorrowListHeaderDefault)}>
                Forecasts For Tomorrow
            </h3>
            <div className={css(styles.forTomorrowListBodyDefault)}>
                <div className={css(styles.forTomorrowListBodyColumn)}>
                    {data.slice(0, columnSize).map((item, index) => {
                        return rowItem(item, index)
                    })}
                </div>

                <div className={css(styles.forTomorrowListBodyColumn)}>
                    {data.slice(columnSize, ).map((item, index) => {
                        return rowItem(item, index)
                    })}
                </div>
            </div>
        </div>
    )


}

export default ForTomorrowList

const styles = StyleSheet.create(
    {
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
            padding: "0.1rem 0",

        },

        forTomorrowListBodyRowLabel: {
            color: themeVars.colors.text.accentGrey,
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "1rem",
            letterSpacing: "1px",

        },

        forTomorrowListBodyRowValue: {
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "10px",
            display: "flex",
            textTransform: "capitalize",

        },

    }
)
