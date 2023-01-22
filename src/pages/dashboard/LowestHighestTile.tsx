import { StyleSheet, css } from 'aphrodite';
import { CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import themeVars from "../../util/themeVars";
const LowestHighestTile = () => {
    const minVal = 66;
    const maxVal = 250;
    const minPercent = (minVal / 500) * 100 > 100 ? 100 : (minVal / 400) * 100;
    const maxPercent = (maxVal / 500) * 100 > 100 ? 100 : (maxVal / 400) * 100;
    const items = ["PM2.5", "PM10", "O3", "CO", "SO2" ]
    const selectedItem = "PM10";
    const minStyle = buildStyles(
        {
            trailColor: themeVars.colors.text.accentGrey,
            pathColor: minVal < 100 ? themeVars.colors.alerts.green : minVal < 200 ? themeVars.colors.alerts.yellow : themeVars.colors.alerts.red,
        }
    );

    const maxStyle = buildStyles(
        {
            trailColor: themeVars.colors.text.accentGrey,
            pathColor: maxVal < 100 ? themeVars.colors.alerts.green : maxVal < 200 ? themeVars.colors.alerts.yellow : themeVars.colors.alerts.red,
        }
    )
    return (
        <div className={css(styles.lowestHighestTileDefault)}>
            <div className={css(styles.selector)}>
                {items.map((item, index) => {
                    return (
                        <div className={css(styles.selectorItem, selectedItem === item && styles.activeItem )} key={index}>
                            <div className={css(styles.selectorItemText)}>
                                {item}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={css(styles.progressBarsCont)}>
                <div className={css(styles.progressBar)}>
                    <CircularProgressbarWithChildren
                        value={minPercent}
                        className={css(styles.progressCircle)}
                        styles={minStyle}>
                        <div className={css(styles.progressCircleText)}>
                            <div className={css(styles.progressCircleTextValue)}>
                                {minVal}
                            </div>
                            <div className={css(styles.progressCircleTextUnit)}>
                                ppm
                            </div>
                        </div>
                    </CircularProgressbarWithChildren>
                    <div className={css(styles.progressCircleLabel)}>
                        <div className={css(styles.progressCircleLabelHead)}>
                            Lowest
                        </div>
                        <div className={css(styles.progressCircleLabelSub)}>
                            Today
                        </div>
                    </div>
                </div>
                <div className={css(styles.progressBar)}>
                    <CircularProgressbarWithChildren
                        value={maxPercent}
                        className={css(styles.progressCircle)}
                        styles={maxStyle}>
                        <div className={css(styles.progressCircleText)}>
                            <div className={css(styles.progressCircleTextValue)}>
                                {maxVal}
                            </div>
                            <div className={css(styles.progressCircleTextUnit)}>
                                ppm
                            </div>
                        </div>

                    </CircularProgressbarWithChildren>
                    <div className={css(styles.progressCircleLabel)}>
                        <div className={css(styles.progressCircleLabelHead)}>
                            Highest
                        </div>
                        <div className={css(styles.progressCircleLabelSub)}>
                            Today
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LowestHighestTile;

const styles = StyleSheet.create(
    {
        lowestHighestTileDefault: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: "1rem",
        },

        selector: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start'

        },

        progressBarsCont: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        progressBar: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
        },

        progressCircle: {
            width: '13rem',
            height: '13rem',
        },

        progressCircleText: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        progressCircleTextValue: {
            fontSize: '2.8rem',
            fontWeight: 500,
            fontStyle: "normal",
            lineHeight: "24px",
            color: themeVars.colors.text.accentGrey,
            letterSpacing: "0.225753rem",
        },

        progressCircleTextUnit: {
            fontSize: '1.2rem',
            fontWeight: 600,
            color: themeVars.colors.text.accentGrey,

        },

        progressCircleLabel: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        },

        progressCircleLabelHead: {
            color: themeVars.colors.text.accentGrey,
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "1.6rem",
            lineHeight: "16px",
            textTransform: "capitalize",
            letterSpacing: "0.08rem",

        },

        progressCircleLabelSub: {
            color: themeVars.colors.text.accentGrey,
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "1.2rem",
            textTransform: "capitalize",

        },

        selectorItem: {
            padding: '0.2rem 1rem',
            borderRadius: '2rem',

        },

        selectorItemText: {
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "1.4rem",
            lineHeight: "2.4rem",
            letterSpacing: "-0.24247px",
            textTransform: "uppercase",
            color: themeVars.colors.text.accentGrey,
        },

        activeItem: {
            backgroundColor: 'rgba(66, 79, 89, 0.49)',

        },

    }
)
