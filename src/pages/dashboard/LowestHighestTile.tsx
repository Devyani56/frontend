import { StyleSheet, css } from 'aphrodite';
import { CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import themeVars from "../../util/themeVars";
import {useEffect, useState} from "react";
interface ILowestHighestTileProps {
    low: any;
    high: any;
}
const LowestHighestTile = ({low, high} : ILowestHighestTileProps) => {

    const [items, setItems] = useState(['PM10']);
    const [selectedItem, setSelectedItem] = useState('PM10');
    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(0);
    const minPercent = (minVal / 500) * 100 > 100 ? 100 : (minVal / 400) * 100;
    const maxPercent = (maxVal / 500) * 100 > 100 ? 100 : (maxVal / 400) * 100;

    useEffect(() => {
        // parse items from low and high and set items
        // read low and high and get the keys
        console.log("low: ",low);
        console.log("high: ",high);

        // get only those keys whos values are not null
        const lowKeys = Object.keys(low).filter((key) => low[key] !== null);
        const highKeys = Object.keys(high).filter((key) => high[key] !== null);
        // get the union of the keys
        // @ts-ignore
        const unionKeys = [...new Set([...lowKeys, ...highKeys])];
        // set items
        setItems(unionKeys);
        // set selected item
        setSelectedItem(unionKeys[0]);
    }
    , [low, high]);

    useEffect(() => {
        // set min and max values
        setMinVal(low[selectedItem]);
        setMaxVal(high[selectedItem]);
    }
    , [low, high, selectedItem]);


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
                        <button className={css(styles.selectorItem, selectedItem === item && styles.activeItem )}
                                key={index}
                                onClick={() => setSelectedItem(item)}
                        >
                            <div className={css(styles.selectorItemText)}>
                                {item}
                            </div>
                        </button>
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
            border: 'none',
            backgroundColor: 'transparent',

        },

        selectorItemText: {
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "1.4rem",
            lineHeight: "2.4rem",
            letterSpacing: "-0.24247px",
            textTransform: "uppercase",
            color: themeVars.colors.text.accentGrey,
            backgroundColor: 'transparent',
            border: 'none',
        },

        activeItem: {
            backgroundColor: 'rgba(66, 79, 89, 0.49)',

        },

    }
)
