import { StyleSheet, css } from 'aphrodite';
import { CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import themeVars from "../../util/themeVars";
const LowestHighestTile = () => {
    const minVal = 66;
    const maxVal = 250;
    const minPercent = (minVal / 500) * 100 > 100 ? 100 : (minVal / 400) * 100;
    const maxPercent = (maxVal / 500) * 100 > 100 ? 100 : (maxVal / 400) * 100;

    const minStyle = buildStyles(
        {
            backgroundColor: 'red',
            trailColor: themeVars.colors.text.accentGrey,
            pathColor: minVal < 100 ? themeVars.colors.alerts.green : minVal < 200 ? themeVars.colors.alerts.yellow : themeVars.colors.alerts.red,
        }
    );

    const maxStyle = buildStyles(
        {
            backgroundColor: 'red',
            trailColor: themeVars.colors.text.accentGrey,
            pathColor: maxVal < 100 ? themeVars.colors.alerts.green : maxVal < 200 ? themeVars.colors.alerts.yellow : themeVars.colors.alerts.red,
        }
    )
    return (
        <div className={css(styles.lowestHighestTileDefault)}>
            <div className={css(styles.selector)}>

            </div>
            <div className={css(styles.progressBarsCont)}>
                <div className={css(styles.progressBar)}>
                    <CircularProgressbarWithChildren
                        value={minPercent}
                        text={`${minVal}`}
                        className={css(styles.progressCircle)}
                        styles={minStyle}>

                    </CircularProgressbarWithChildren>
                </div>
                <div className={css(styles.progressBar)}>
                    <CircularProgressbarWithChildren
                        value={maxPercent}
                        text={`${maxVal}`}
                        className={css(styles.progressCircle)}
                        styles={maxStyle}>

                    </CircularProgressbarWithChildren>
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
        },

        selector: {

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
        },

        progressCircle: {
            width: '12rem',
            height: '12rem',
        }

    }
)
