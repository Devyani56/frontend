import { StyleSheet, css } from 'aphrodite';

import themeVars from "../../util/themeVars";
import Button from "../../components/buttons/Button";
import VerticalGap from "../../components/VerticalGap";
interface IUploadOptionCardProps {
    header: string;
    children: any;
    onClick: () => void;

    imgSrc: string;

}
const UploadOptionCard = ({ header, onClick, children, imgSrc}: IUploadOptionCardProps) => {
    return (
        <div className={css(styles.UploadOptionCard)}>
            <div className={css(styles.UploadOptionCardHeader)}>
                <img src={imgSrc} alt="upload" className={css(styles.UploadOptionCardImg)} />
            </div>
            <div className={css(styles.UploadOptionCardText)}>
                <div className={css(styles.typeHeader)}>
                    {header}
                </div>
                <div className={css(styles.typeContent)}>
                    {children}
                </div>
                <VerticalGap gap={'2.2rem'} />
                <Button type={"long"} color={themeVars.colors.accent.darkGreen} onClick={onClick}>Upload</Button>
            </div>
        </div>
    )
}

export default UploadOptionCard;

const styles = StyleSheet.create({
    UploadOptionCard: {
        width: '36rem',
        height: '40rem',
        backgroundColor: themeVars.colors.accent.light,
        borderRadius: '1.4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    UploadOptionCardHeader: {
        width: '100%',
        height: '20rem',
        backgroundColor: themeVars.colors.accent.green,
        borderRadius: '1.4rem 1.4rem 0 0',

    },

    UploadOptionCardText: {
        padding: '2rem',
        boxSizing: 'border-box',

    },

    Selected: {

    },

    SelectedIcon: {

    },

    SelectedText: {

    },

    Unselected: {

    },

    UploadOptionCardImg: {
        height: '20rem',
        width: '100%',
        borderRadius: '1.4rem 1.4rem 0 0',
    //     add green overlay on top of image
        backgroundColor: themeVars.colors.accent.darkGreen,
        opacity: 0.5,

    },

    typeHeader: {
        fontSize: '2.4rem',
        fontWeight: 'normal',
        color: themeVars.colors.accent.dark,
        marginBottom: '1rem',

    },

    typeContent: {
        fontSize: '1.6rem',
        fontWeight: 'normal',
        color: themeVars.colors.text.accentGrey,
        lineHeight: '2.2rem',

    }



})

