import { StyleSheet, css } from 'aphrodite';
import React from "react";
interface InfoContainerProps {
    children: React.ReactNode;
}
const InfoContainer = ({children}: InfoContainerProps) => {
    return (
        // make this
        <div className={css(styles.infoContainerDefault)}>
            {children}
        </div>
    );
}

export default InfoContainer;

const styles = StyleSheet.create(
    {

        infoContainerDefault: {
            minWidth: '80%',
            display: 'grid',
            gridTemplateColumns: '1.1fr 1.2fr 1fr',
            gap: '2rem',
            maxWidth: "1080",
            '@media (max-width: 1400px)': {
                gridTemplateColumns: '1fr',
                minWidth: "50rem",
            },

            '@media (max-width: 800px)': {
                gridTemplateColumns: '1fr',
            }

        }
    }
)
