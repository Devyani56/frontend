import {StyleSheet, css} from "aphrodite";
import themeVars from "../../util/themeVars";
import {NavLink} from "react-router-dom";
import {CirclesThree, HardDrives, House, ChartLineUp, UploadSimple, UsersThree} from "phosphor-react";
import LogoHeader from "../dashboard/LogoHeader";
import VerticalGap from "../../components/VerticalGap";
import useStore from "../../store/Store";

const ProSideBar = () => {
    const isLoggedIn = useStore((state) => state.user.id !== "");
    // const isLoggedIn = true;
    const isProRole = useStore((state) => state.user.roles.admin || state.user.roles.manager || state.user.roles['dp-manager'] || state.user.roles['data-analyst']);
    const isAdminRole = useStore((state) => state.user.roles.admin);
    return (
        <div className={css(styles.sideBarDefault)}>
            <LogoHeader/>
            <VerticalGap gap={'2rem'}/>
            <div className={css(styles.sideBarNavCont)}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        !isActive ? css(styles.sideBarNavLink) : css(styles.sideBarNavLinkActive)
                    }>
                    <House size={20} weight="bold" /> Home
                </NavLink>
                <NavLink
                    to="datasources"
                    className={({ isActive }) =>
                        !isActive ? css(styles.sideBarNavLink) : css(styles.sideBarNavLinkActive)
                    }>
                    <CirclesThree size={20} weight="bold" /> Data Sources
                </NavLink>
                {/*<NavLink*/}
                {/*    to="data"*/}
                {/*    className={({ isActive }) =>*/}
                {/*        !isActive ? css(styles.sideBarNavLink) : css(styles.sideBarNavLinkActive)*/}
                {/*    }>*/}
                {/*    <HardDrives size={20} weight="bold" /> Collected Data*/}
                {/*</NavLink>*/}
                <NavLink
                    to="visualize"
                    className={({ isActive }) =>
                        !isActive ? css(styles.sideBarNavLink) : css(styles.sideBarNavLinkActive)
                    }>
                    <ChartLineUp size={20} weight="bold" /> Forecasts
                </NavLink>
                {isProRole && <NavLink
                    to="upload"
                    className={({isActive}) =>
                        !isActive ? css(styles.sideBarNavLink) : css(styles.sideBarNavLinkActive)
                    }>
                    <UploadSimple size={20} weight="bold"/> Upload Data
                </NavLink>}
                {isAdminRole && <NavLink
                    to="user-management"
                    className={({isActive}) =>
                        !isActive ? css(styles.sideBarNavLink) : css(styles.sideBarNavLinkActive)
                    }>
                    <UsersThree size={20} weight="bold"/> User Management
                </NavLink>}
            </div>

        </div>
    );
}

const styles = StyleSheet.create(
    {
        sideBarDefault: {
            backgroundColor: themeVars.colors.backgrounds.lightest,
            width: '30rem',
            minHeight: '100%',
            padding: '1rem',
            boxSizing: 'border-box',
        },

        sideBarNavCont: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            marginTop: '2rem',

        },

        sideBarNavLink: {
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '22px',
            color:  themeVars.colors.accent.dark2,
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1.4rem',
            padding: '1rem',
            width: '100%',
            boxSizing: 'border-box',

            ':hover': {
                backgroundColor: themeVars.colors.accent.transparentGreen2,
                borderRadius: '1rem',
            }

        },

        sideBarNavLinkActive: {
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '22px',
            color:  themeVars.colors.accent.darkGreen,
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1.4rem',
            padding: '1rem',
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: themeVars.colors.accent.transparentGreen,
            borderRadius: '0.4rem',
        }




    }
)

export default ProSideBar;
