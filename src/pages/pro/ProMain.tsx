
import { StyleSheet, css } from 'aphrodite';
import ProSideBar from "./ProSideBar";
import themeVars from "../../util/themeVars";
import {Route, useLocation, Routes} from "react-router-dom";
import DataSources from "./DataSources";
import DataBoard from "./DataBoard";
import UploadDataBoard from "./UploadDataBoard";
import VisualizeModels from "./VisualizeModels";
import UserManagement from "./UserManagement";


const ProNote = () => {
    return (
        <div className={css(styles.note)}>
            <h1>Pro Dashboard</h1>
            <p>
                This is the Pro Dashboard. Here you can manage your data sources, upload new data, and view forecasts.
                Select an option from the sidebar to get started.
            </p>
        </div>
    );
};
const ProMainPage = () => {
    const location = useLocation();
    return (
        <main className = {css(styles.mainDefault)} >
            <aside className={css(styles.aside)}>
                <ProSideBar/>
            </aside>
            <section className={css(styles.section)}>
                <Routes>
                    <Route path="/datasources" element={<DataSources/>}/>
                    <Route path="/data/*" element={<DataBoard/>}/>
                    <Route path="/upload/*" element={<UploadDataBoard/>}/>
                    <Route path="/user-management/*" element={<UserManagement/>}/>
                    <Route path="/visualize/*" element={<VisualizeModels/>}/>
                    <Route path="/" element={<ProNote/>}/>
                </Routes>
            </section>
        </main>
    );
};

export default ProMainPage;

const styles = StyleSheet.create(
    {
        mainDefault: {
            display: 'flex',
            flexDirection: 'row',
            minHeight: '100%',
            boxSizing: "border-box"
        },

        aside: {
            minHeight: '100%',
            width: '30rem',
            boxSizing: 'border-box',

            '@media (max-width: 900px)': {
                display: 'none',
            },

            borderRight: '1px solid '+ themeVars.colors.others.borderGrey,

        },

        section: {
            width: "100%",
            minHeight: '100vh',
            boxSizing: "border-box"
        },

        note: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: '1rem',
            boxSizing: 'border-box',
            gap: '1rem',
            textAlign: 'center',
            color: themeVars.colors.text.accentGrey,

            '@media (max-width: 900px)': {
                display: 'none',
            },
            fontSize: '1.5rem',
        }

    }
)
