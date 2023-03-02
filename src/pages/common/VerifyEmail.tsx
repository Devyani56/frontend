import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {verifyEmailApi} from "../../util/api/VerifyEmailApi";
import {StyleSheet, css} from "aphrodite";
import logo from "../../assets/images/logo.png";
import themeVars from "../../util/themeVars";
import {TailSpin} from "react-loader-spinner";
const VerifyEmail = () => {
    const {token} = useParams();
    const [message, setMessage] = useState<any>({});
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(true);
    const verifyEmail = async () => {
        if (!token) {
            return;
        }
        const response = await verifyEmailApi(token);
        if (response.type === "success") {
            setError(false);
            console.log("Email verified successfully, Response: ", response.data);
            setMessage(response.data);
        } else {
            setError(true);
            // convert to string
            const msgString = JSON.stringify(response.data);
            setMessage(msgString);
        }
        setLoading(false);
    }
    useEffect(() => {
        verifyEmail();
    }
    , [token]);

    return (
        <div className={css(styles.main)}>
            <div className={css(styles.msgCont)}>
                <div className={css(styles.logoHeader)}>
                    <img src={logo} alt="logo" className={css(styles.logo)}/>
                </div>
                <div className={css(styles.header)}>
                    Verifying Your Email...
                </div>
                <div className={css(styles.msgBoxCont)}>
                    <div className={css(styles.msgBox)}>
                        {loading
                            &&
                            <TailSpin
                                height="80"
                                width="80"
                                color={themeVars.colors.accent.darkGreen}
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                visible={true}
                            />
                        }
                        {
                            !loading && !error &&
                            <div className={css(styles.msgBox)}>
                                <div className={css(styles.msg)}>
                                    {`Hey ${message.firstName}! Your email has been verified.`}
                                </div>
                            </div>
                        }
                        {
                            !loading && error &&
                            <div className={css(styles.msgBox)}>
                                <div className={css(styles.msgErr)}>
                                    {`Sorry, ${message || "something went wrong"}.`}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    msgCont: {
        width: '80%',
        maxWidth: '70rem',
        height: '80%',
        borderRadius: '1rem',
        backgroundColor: themeVars.colors.backgrounds.lightest
    },

    logoHeader: {
        width: '100%',
        height: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        padding: '3rem 0',
    },

    logo: {
        height: '100%',
    },

    header: {
        width: '100%',
        height: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '4rem',
        color: themeVars.colors.mainBackground.dark,
        boxSizing: 'border-box',
    },

    msgBox: {
        width: '90%',
        maxHeight: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        color: themeVars.colors.mainBackground.dark,
        boxSizing: 'border-box',
    },

    msgBoxCont: {
        width: '100%',
        maxHeight: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
    },

    msg: {
    },

    msgErr: {
        color: themeVars.colors.alerts.red
    }
})