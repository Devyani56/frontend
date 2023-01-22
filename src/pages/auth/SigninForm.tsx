import {StyleSheet, css} from "aphrodite";
import Input from "../../components/Input";
import themeVars from "../../util/themeVars";
import Button from "../../components/buttons/Button";
import VerticalGap from "../../components/VerticalGap";
import {styles} from "./SigninSignupStyle"
interface ISigninFormProps {
    changeMode: () => void;
}

const SigninForm = ({changeMode}:ISigninFormProps) => {
    return(
        <div className={css(styles.SigninFormDefault)}>
            <div className={css(styles.SigninFormHeaderCont)}>
                <div className={css(styles.SigninFormHeader)}>
                    Dive in for more!
                </div>
                <div className={css(styles.SigninFormSubHeader)}>
                    New to us? <button onClick={changeMode} className={css(styles.Link)}>Sign up</button>
                </div>
            </div>
            <div className={css(styles.SigninFormBody)}>
                <Input label={"Email"} name={"name"} type={"text"} value={"Hello"} placeHolder={"Enter your email address"} onChange={()=>{}}/>
                <Input label={"Password"} name={"name"} type={"text"} value={""} placeHolder={"Enter your password"} onChange={()=>{}}/>
                <VerticalGap gap={"0.8rem"}/>
                <Button  onClick={()=>{}} type={"long"}
                         color={themeVars.colors.accent.green}
                         hoverColor={themeVars.colors.accent.darkGreen}>
                    Sign in
                </Button>

            </div>
        </div>
    )
}

export default SigninForm;
