import SideBar from "./SideBar";
import Board from "./Board";
import { StyleSheet, css } from 'aphrodite';

const MainPage = () => {
    return (
        <main className = {css(styles.mainDefault)} >
            <aside className={css(styles.aside)}>
                <SideBar/>
            </aside>
            <section className={css(styles.section)}>
                <Board/>
            </section>
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
            minHeight: '100%',
        }
        ,
        aside: {
            minHeight: '100%',
            width: '50%',
            maxWidth: '42rem',
            flexShrink: 2,

        },

        section: {
            width: "100%",
            minHeight: '100vh',
            flexShrink: 1,
        }

    }
)
