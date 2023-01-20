import { StyleSheet, css } from 'aphrodite';
import React from "react";

interface InfoSubSectionProps {
    children: React.ReactNode;
}
const InfoSubSection = ({children} : InfoSubSectionProps) => {

    return (
        // make this
        <div className={css(styles.infoSubSectionDefault)}>
            {children}
        </div>
    );
}

export default InfoSubSection;

const styles = StyleSheet.create(
    {
        // make this a css grid with 3 columns when the screen is wide enough
        // make this a css grid with 1 column when the screen is not wide enough

        infoSubSectionDefault: {
            display: 'flex',
            width: "100%",
            flexDirection: 'row',
            gap: "2rem",
            justifyContent: 'space-between',
        }
    }
)
