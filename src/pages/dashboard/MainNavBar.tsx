import {StyleSheet, css} from "aphrodite";
import Button from "../../components/buttons/Button";
import themeVars from "../../util/themeVars";
import {List} from "phosphor-react";
import useStore from "../../store/Store";
import LocationSelector from "./LocationSelector";

interface IMainNavBarProps {
    openSideDrawer: () => void;
    location: {
        "sourceId": string,
        "sourceName": string,
        "sourceType": string,
        "sourceLat": number,
        "sourceLng": number,
        address: string
    }

    setLocation: (location: {
        "sourceId": string,
        "sourceName": string,
        "sourceType": string,
        "sourceLat": number,
        "sourceLng": number,
        address: string
    }) => void
}
const MainNavBar = ({openSideDrawer, location, setLocation}:IMainNavBarProps) => {
    const user = useStore((state) => state.user);

    return (
        <div className={css(styles.mainNavBar)}>
            <div className={css(styles.mainNavBarContainer)}>
                <div className={css(styles.mainNavBarLeft)}>
                  <LocationSelector location={location} setLocation={setLocation}/>
                </div>
                <div className={css(styles.mainNavBarRight)}>
                   <div className={css(styles.mainNavBarLinksCont)}>
                       <button className={css(styles.mainNavBarLinks)}>
                           Data Sources
                       </button >
                       <button className={css(styles.mainNavBarLinks)} >
                           Data
                       </button>
                       <button className={css(styles.mainNavBarLinks)}>
                           Map
                       </button>
                       <button className={css(styles.mainNavBarLinks)}>
                           About
                       </button>
                       <button className={css(styles.mainNavBarLinks, styles.signupBtn)}>
                           {user.name ? user.name : "Sign Up"}
                       </button>
                       <div className={css(styles.hamMenu)} onClick={openSideDrawer}>
                           <List size={24} weight="bold" />
                       </div>
                   </div>


                </div>
            </div>
        </div>
    )
}


export default MainNavBar

const styles = StyleSheet.create(
    {
        mainNavBar: {

        },

        mainNavBarContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
        },

        mainNavBarLeft: {

        },

        mainNavBarLogo: {

        },

        mainNavBarTitle: {

        },

        mainNavBarRight: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            minWidth: '50%',

        },

        mainNavBarSearch: {

        },

        mainNavBarUser: {

        },

        subscribeBtn: {
            backgroundColor: themeVars.colors.accent.darkGreen,
            color: '#fff',
            border: 'none',
            borderRadius: '2rem',
            padding: '0.8rem 2rem',
            fontSize: '1.6rem',
            fontWeight: 600,
        },

        mainNavBarLinksCont: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            width: '100%',
            maxWidth: '55rem',


        },


        mainNavBarLinks: {
            color: themeVars.colors.text.accentGrey,
            fontSize: '1.2rem',
            fontWeight: 500,
            backgroundColor: 'transparent',
            border: 'none',
            letterSpacing: '0.085em',

        },

        hamMenu: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            color: themeVars.colors.alerts.red,
            cursor: 'pointer',

            'hover': {
                color: 'red',
            }

        },

        signupBtn: {
            color: themeVars.colors.alerts.red,
        }


    }
)
