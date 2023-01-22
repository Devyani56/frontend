import {StyleSheet, css} from "aphrodite";
import Input from "../../components/Input";
import themeVars from "../../util/themeVars";
import Button from "../../components/buttons/Button";
import VerticalGap from "../../components/VerticalGap";
import {styles} from "./SigninSignupStyle"
interface ISignupFormProps {
    changeMode: () => void;
}
const SignupForm = ({changeMode}:ISignupFormProps) => {
    return(
        <div className={css(styles.SigninFormDefault)}>
            <div className={css(styles.SigninFormHeaderCont)}>
                <div className={css(styles.SigninFormHeader)}>
                    Join for updates and more!
                </div>
                <div className={css(styles.SigninFormSubHeader)}>
                    Already with us <button onClick={changeMode} className={css(styles.Link)} >Sign in</button>
                </div>
            </div>
            <div className={css(styles.SigninFormBody)}>
                <Input label={"Name"} name={"name"} type={"text"} value={""} placeHolder={"Enter your name"} onChange={()=>{}}/>
                <Input label={"Email"} name={"name"} type={"text"} value={"Hello"} placeHolder={"Enter your email address"} onChange={()=>{}}/>
                <Input label={"Password"} name={"name"} type={"text"} value={""} placeHolder={"Enter your password"} onChange={()=>{}}/>

                <VerticalGap gap={"0.8rem"}/>
                <Button  onClick={()=>{}} type={"long"}
                         color={themeVars.colors.accent.green}
                         hoverColor={themeVars.colors.accent.darkGreen}>
                    Sign up
                </Button>

            </div>
        </div>
    )
}

export default SignupForm;
