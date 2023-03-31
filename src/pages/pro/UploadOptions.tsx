import {css, StyleSheet} from "aphrodite";
import UploadOptionCard from "./UploadOptionCard";
import {useNavigate} from "react-router-dom";
import csvImg from '../../assets/images/csv.jpg';
import manualImg from '../../assets/images/manual.jpg';
const UploadOptions = () => {
    const navigate = useNavigate();
    return (
        <div className={css(styles.uploadOptions)}>
            <div className={css(styles.uploadOptionsCont)}>
                <UploadOptionCard header={"Upload CSV"} onClick={() => navigate('/pro/upload/from-csv')} imgSrc={csvImg}>
                    Upload pollution data from a CSV file. The pollution data in the csv file need not be in a specific format.
                </UploadOptionCard>
                <UploadOptionCard header={"Upload Manually"} onClick={() => navigate('/pro/upload/manual')} imgSrc={manualImg}>
                   You can easily upload data point manually, this is the best option if you have a few data points to upload.
                </UploadOptionCard>
            </div>
        </div>
    );
}

export default UploadOptions;

const styles = StyleSheet.create({
    uploadOptions: {
        width: '100%',
        height: '100%',
        paddingTop: '10rem',
        marginRight: '10rem'
    },

    uploadOptionsCont: {
        width: '100%',
        height: '100%',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap:  '10%',
        flexWrap: 'wrap',
        marginRight: '35%',
        boxSizing: 'border-box'
    }
});
