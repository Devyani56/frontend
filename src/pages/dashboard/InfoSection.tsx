import { StyleSheet, css } from 'aphrodite';
import React from "react";

interface InfoSectionProps {
    children: React.ReactNode;

}
const InfoSection = ({children} : InfoSectionProps) => {
    return (
        // make this
        <div className={css(styles.infoSectionDefault)}>
            {children}
        </div>
    );
}

export default InfoSection;

const styles = StyleSheet.create(
    {
        // make this a css grid with 3 columns when the screen is wide enough
        // make this a css grid with 1 column when the screen is not wide enough

        infoSectionDefault: {
            display: 'flex',
            // gap: '1rem',
            width: "100%",
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '2rem',

        }
    }
)
