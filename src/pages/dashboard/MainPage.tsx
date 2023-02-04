import SideBar from "./SideBar";
import Board from "./Board";
import { StyleSheet, css } from 'aphrodite';
import SideDrawer from "./SideDrawer";
import {useState} from "react";


const MainPage = () => {

    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

    const closeSideDrawer = () => {
        setSideDrawerOpen(false);
    }

    const openSideDrawer = () => {
        setSideDrawerOpen(true);
    }

    return (
        <main className = {css(styles.mainDefault)} >
            <aside className={css(styles.aside)}>
                <SideBar/>
            </aside>
            <section className={css(styles.section)}>
                <Board openSideDrawer={openSideDrawer}/>
            </section>
            <SideDrawer isOpen={sideDrawerOpen} onClose={closeSideDrawer}/>
        </main>
    );
};

export default MainPage;

const styles = StyleSheet.create(
    {
        mainDefault: {
            display: 'flex',
            flexDirection: 'row',
            // width: '100%',
            minHeight: '100vh',
        },

        aside: {
            minHeight: '100%',
            width: '50%',
            maxWidth: '42rem',
            boxSizing: 'border-box',

            '@media (max-width: 900px)': {
                display: 'none',
            },

            // add sticky and --webkit sticky both for position
            position: 'sticky',
            //
            //
            //
            // top: 0,
            // left: 0,
            // zIndex: 100,


        },

        section: {
            width: "100%",
            minHeight: '100%',
            boxSizing: 'border-box',
        }

    }
)
