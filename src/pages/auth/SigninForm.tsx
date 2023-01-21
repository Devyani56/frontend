import {StyleSheet, css} from "aphrodite";
import Input from "../../components/Input";

const SigninForm = () => {
    return(
        <div className={css(styles.SigninFormDefault)}>
            <div className={css(styles.SigninFormHeader)}>
                Dive in for more!
            </div>
            <div className={css(styles.SigninFormSubHeader)}>

            </div>
            <div className={css(styles.SigninFormBody)}>
                <Input label={"Name"} name={"name"} type={"text"} value={"Hello"} placeHolder={"Enter your full name"} onChange={()=>{}}/>
                <Input label={"Email"} name={"name"} type={"text"} value={"Hello"} placeHolder={"Enter your email address"} onChange={()=>{}}/>
                <Input label={"Password"} name={"name"} type={"text"} value={""} placeHolder={"Choose a password"} onChange={()=>{}}/>

            </div>
        </div>
    )
}

export default SigninForm;

const styles = StyleSheet.create(
    {
        SigninFormDefault: {
            width: "100%",
            height: "auto",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
        },

        SigninFormHeader: {
            width: "100%",
            height: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
        },

        SigninFormBody: {
            width: "90%",
            maxWidth: "32rem",
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
        },

        SigninFormSubHeader: {
        }
    }
)

