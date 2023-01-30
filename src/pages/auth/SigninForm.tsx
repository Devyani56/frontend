import Input from "../../components/Input";
import themeVars from "../../util/themeVars";
import Button from "../../components/buttons/Button";
import VerticalGap from "../../components/VerticalGap";
import {styles} from "./SigninSignupStyle"
import {css} from "aphrodite";
interface ISigninFormProps {
    changeMode: () => void;
    userDetails: {
        email: string;
        password: string;
        name: string;
    },

    errors: {
        email: {
            error: boolean,
            message: string
        },
        password: {
            error: boolean,
            message: string
        },
        name: {
            error: boolean,
            message: string
        }
    },

    handleChange: (e: any) => void;

    validateField: (field: string, value: string) => void;

    onSubmit: (e: any) => void;
}

const SigninForm = ({changeMode, userDetails, handleChange, errors, validateField, onSubmit }:ISigninFormProps) => {
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
            <form className={css(styles.SigninFormBody)}>
                <Input
                    label={"Email"}
                    name={"email"}
                    type={"email"}
                    value={userDetails.email}
                    placeHolder={"Enter your email address"}
                    onChange={(e)=>{handleChange(e)}}
                    error={errors.email}
                    onBlur={validateField}
                />

                <Input
                    label={"Password"}
                    name={"password"} type={"password"}
                    value={userDetails.password}
                    placeHolder={"Enter your password"}
                    onChange={(e)=>{handleChange(e)}}
                    error={errors.password}
                    onBlur={validateField}
                />
                <VerticalGap gap={"0.8rem"}/>
                <Button
                    type={"long"}
                    onClick={onSubmit}
                    color={themeVars.colors.accent.green}
                    hoverColor={themeVars.colors.accent.darkGreen}
                >
                    Sign in
                </Button>

            </form>
        </div>
    )
}

export default SigninForm;
