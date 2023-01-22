import {useState} from "react";
import {StyleSheet, css} from "aphrodite";
import signinSignupImage from "../../assets/images/signin-signup-background.png";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
const SigninSignup = () => {
    const [isSignUp, setIsSignup] = useState(false);

    const changeMode = () => {
        setIsSignup(!isSignUp);
    }

    return (
         <div className={css(styles.signinSignupDefault)}>
             <div className={css(styles.signinSignupImgCont)}>
                 <img src={signinSignupImage} alt="signinSignupImg" className={css(styles.signinSignupImg)}/>
             </div>
             <div className={css(styles.signinSignupFormCont)}>
                 {!isSignUp && <SigninForm changeMode={changeMode}/>}
                 {isSignUp && <SignupForm changeMode={changeMode}/>}
             </div>

         </div>
    );
};

export default SigninSignup;

const styles = StyleSheet.create(
    {
        signinSignupDefault: {
            display: 'flex',
            flexDirection: 'row',
            width: "100%",
            height: "80rem",
            backgroundColor: "transparent",
            borderRadius: "2rem",

        },
        signinSignupImgCont: {
            flex: "1",

        },
        signinSignupFormCont: {
            flex: "1",
            background: 'rgba(243, 249, 250, 0.87)',
            backdropFilter: 'blur(6px)',
            borderRadius: '0 2rem 2rem 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        },
        signinSignupImg: {
            width: "100%",
            height: "100%",
            borderRadius: "2rem 0 0 2rem",
            objectFit: "cover",
            // make image transparent
            // apply webkit specific blur
            WebkitBackdropFilter: 'blur(120px)',
        }
    }
)
