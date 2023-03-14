import {StyleSheet, css} from "aphrodite";
import themeVars from "../../util/themeVars";
import {X} from 'phosphor-react'
import useStore from "../../store/Store";
import {useNavigate} from "react-router-dom";


interface ISideDrawerProps {
    isOpen : boolean;
    onClose: () => void;
}
const SideDrawer = ({isOpen, onClose}:ISideDrawerProps) => {
    const user = useStore((state) => state.user);
    const navigate = useNavigate();
    // const isLoggedIn = useStore((state) => state.user.id !== "");
    const isLoggedIn = true;
    // const isProRole = useStore((state) => state.user.roles.admin || state.user.roles.manager || state.user.roles['dp-manager'] || state.user.roles['data-analyst']);
    const isProRole = true;
    return (
        <div className={css(styles.sideDrawer, isOpen && styles.drawerOpen)}>
            <button className={css(styles.closeBtn)} onClick={onClose}><X size={30}/></button>
            <div className={css(styles.sideDrawerContent)}>
                {
                    isLoggedIn && isProRole &&
                    <div className={css(styles.btnCont)}>
                        <button className={css(styles.drawerBtn)} onClick={() => navigate('/pro')}>
                            Pro Dashboard
                        </button>
                        <button className={css(styles.drawerBtn)} onClick={() => navigate('/pro/datasources')}>
                            Data Sources
                        </button>
                        <button className={css(styles.drawerBtn) } onClick={() => navigate('/pro/data')}>
                            Data Records
                        </button>
                        <button className={css(styles.drawerBtn)} onClick={() => navigate('/pro/forecasts')}>
                            Forecasts
                        </button>
                        <button className={css(styles.drawerBtn)} onClick={() => navigate('/pro/upload')}>
                            Upload Data
                        </button>
                        <button className={css(styles.drawerBtn)} onClick={() => navigate('/pro/visualize')}>
                            visualize Data
                        </button>
                        <button className={css(styles.drawerBtn)}>
                            View Profile
                        </button>
                    </div>
                }

            {!isLoggedIn &&
                <div className={css(styles.btnCont)}>
                    <button className={css(styles.drawerBtn)}>
                        Sign Up
                    </button>
                    <button className={css(styles.drawerBtn)}>
                        Sign In
                    </button>

                </div>
            }

            {
                isLoggedIn && !isProRole &&
                    <div className={css(styles.btnCont)}>
                        <button className={css(styles.drawerBtn)}>
                           Apply for Pro Roles
                        </button>
                        <button className={css(styles.drawerBtn)}>
                            View Profile
                        </button>

                    </div>
            }
        </div>

    </div>)
}

export default SideDrawer

const styles = StyleSheet.create({
    sideDrawer: {
        width: '30rem',
        minHeight: '100vh',
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 100,
    //     make a glass like background for the side drawer
        backgroundColor:  'rgba(127,200,182,0.8)',
        backdropFilter: 'blur(5px)',

    //      make slide down animation to slide in from the right
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-out'
    },

    closeBtn: {
        position: 'absolute',
        top: '0.5rem',
        right: '0.5rem',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        color:  'white'
    },

    sideDrawerContent: {
        width: '100%',
        minHeight: '100%',
        boxSizing: 'border-box',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    btnCont: {
        marginTop: '4rem',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '100%',
        width: '100%',
        gap: '1rem',

    },

    drawerBtn: {
        width: '100%',
        // give a glassy effect to the buttons
        backgroundColor: 'rgba(255,255,255,0)',
        border: 'none',
        outline: 'none',
        color: 'white',
        fontWeight: 400,
        fontSize: '1.6rem',
        cursor: 'pointer',
        textAlign: 'left',
        padding: '1rem 1rem',
        borderRadius: '1rem',

        ':hover': {
            backgroundColor: 'rgba(255,255,255,0.1)',
        },

    }
    ,
    drawerOpen: {
        transform: 'translateX(0%)',
    }
})
