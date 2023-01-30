import {styles} from "./SigninSignupStyle";
import {css} from "aphrodite";
import {Envelope} from "phosphor-react";

interface IVerifyEmailPromptProps {
    toLogin: () => void;
}
const VerifyEmailPrompt = ({toLogin}:IVerifyEmailPromptProps) => {
    return (
        <div className={css(styles.SigninFormDefault)}>
            <div>
                <div className={css(styles.verifyEmailBox)}>
                    <div className={css(styles.iconCont)}>
                        <Envelope size={40} />
                    </div>
                    <div className={css(styles.verifyEmailText)}>
                        Verify Your Email Address
                    </div>
                    <div className={css(styles.verifyEmailSubText)}>
                        We have sent you an email with a link to verify your email address. <br/>
                        Please check your inbox.
                    </div>
                    <div className={css(styles.verifyEmailPS)}>Once verified go to <button onClick={toLogin}className={css(styles.Link)}>login</button></div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmailPrompt
