import {StyleSheet, css} from 'aphrodite';
import themeVars from "../../util/themeVars";
import {CaretDown, Crosshair} from "phosphor-react";
const LocationSelector = () => {
    return (

        <div>
            <div className={css(styles.locationSelector)}>
                <button className={css(styles.locationSelectorButton)}>
                    Farmagudi <CaretDown size={20} weight="bold" />
                </button>
                <button className={css(styles.gpsButton)}>
                    <Crosshair size={32}/>
                </button>
            </div>
        </div>
    );
};


export default LocationSelector;


const styles = StyleSheet.create(
    {
        locationSelector: {
            width: '30rem',
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            alignItems: 'center',


        },

        locationSelectorButton: {
            backgroundColor: 'transparent',
            color: themeVars.colors.accent.darkGreen,
            border: '1px solid ' + themeVars.colors.accent.darkGreen,
            borderRadius: '2rem',
            padding: '0.8rem 1.2rem',
            fontSize: '1.6rem',
            cursor: 'pointer',
            fontWeight: 600,
            letterSpacing: '0.1rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0.8rem',
        },

        gpsButton: {
            backgroundColor: 'transparent',
            color: themeVars.colors.accent.darkGreen,
            border: 'none',

        }


    }
)
