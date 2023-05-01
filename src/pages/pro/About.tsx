// import profile images
import divyansh from "../../assets/images/divyansh.jpeg";
import pranav from "../../assets/images/pranav.jpeg";
import clint from "../../assets/images/clint.png";
import thasseem from "../../assets/images/thassem.png";
import {StyleSheet, css} from "aphrodite";

interface ContributerCardProps {
    name: string,
    img: string,
    text: string,
}

const divyanshInfo = "I have been at IIT Goa as an undergrad, for four years now. Got my hands dirty on lots of stuffs, pro at none I am afraid. Got some experience as Research Intern past summer, thanks to IIIT Hyderabad. Upcoming intern at Sprinkr, thanks to DSA. Also working at Oxytocin as Full Stack Dev, because we wants our hands dirty in everything Smeagol.\n" +
    "\n" +
    "I am very interested in the new buzz, like everybody else, say it AI, ML, Quantum and what not. Fond of new hardwares, and gadgets. Feel entrepreneurship is cool and fun. Love reading, even textbooks (it needs to be a good one) !!. I am also a casual gamer. And ya!!, I paint and sketch, but this too casually. I Like travelling. Not good at singing, am a Chess beginner. Still waiting for my letter from Hogwarts School of Witchcraft and Wizardry.\n" +
    "\n" +
    "I consider myself more of a consistent than a pacer. Am a dog person, but cats are cool too. Consider happiness as THE goal of life. I think I am a (fairly) responsible person. Friends and family are my priority. \n" +
    "\n" +
    "Open for discussion on ideas, tech, books or almost anything.";
const pranavInfo = "I am a BTech 2019 Student at IIT Goa. Interested in Web Development and Machine Learning. Currently working on a project to predict air quality using machine learning.";
const clintInfo = "I am an Assistant Professor in the School of Mathematics and Computer Science at IIT Goa. I was previously a postdoc at the Informatics Institute and Department of Statistics, University of Florida with Dr. George Michailidis. I received Ph.D. and M.S. from the Department of Computer and Information Science and Engineering, University of Florida. Dr. Joseph N. Wilson (CS) and Dr. Hani Doss (Stats) were my Ph.D. advisers. I completed B. Tech. in Computer Science and Engineering from the College of Engineering Thiruvananthapuram, University of Kerala. "
const thasseemInfo= "I am currently working as an Assistant Professor in the School of Mechanical Sciences at Indian Institute of Technology (IIT) Goa, India. Before joining IIT Goa in May 2018, I was working as a post-doctoral researcher at Institute of Particle Technology, Friedrich Alexander University, Erlangen, Germany in the group of Prof. Wolfgang Peukert. I worked as a guest scientist from 2015-2017 in the same group, with fellowship from the Alexander von Humboldt foundation. I completed my Ph D in 2013 from the University of Minnesota, USA under the guidance of Dr. Christopher J Hogan Jr. My main research interests include the characterization of non-spherical aerosol nanoparticles and monitoring and improvement of air quality."
const ContributerCard = ({name, img, text }: ContributerCardProps) => {
    return (
        <div className={css(styles.contributerCard)}>
            <div className={css(styles.nameImgCard)}>
                <img src={img} alt={name} className={css(styles.contributerImg)}/>
                <div className={css(styles.contributerName)}>{name}</div>
            </div>
            <p className={css(styles.contributerText)}>{text}</p>
        </div>
    )
}
const About = () => {
    return (
        <div className={css(styles.about)}>
            <h1 className={css(styles.title)}>Contributers</h1>
            <div className={css(styles.contributers)}>
                <ContributerCard name={'Divyansh'} img={divyansh} text={divyanshInfo}/>
                <ContributerCard name={'Pranav'} img={pranav} text={pranavInfo}/>
                <ContributerCard name={'Clint'} img={clint} text={clintInfo}/>
                <ContributerCard name={'Thasseem'} img={thasseem} text={thasseemInfo}/>
            </div>
        </div>
    )
}

export default About

const styles = StyleSheet.create({
    about: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        padding: '2rem 4%',
    },

    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: '2rem',
        width : '100%',
        boxSizing: 'border-box',
    },

    contributers: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    contributerCard: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: '2rem',
        gap: '5rem',
    },

    contributerImg: {
        width: '100%',
        marginBottom: '1rem',
        boxSizing: 'border-box',
    },

    contributerName: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: '1rem',
    },

    contributerText: {
        fontSize: '1.5rem',
        fontWeight: 'normal',
        color: '#000000',
        marginBottom: '1rem',
        textAlign: 'justify',
        width: '80%',
    },

    nameImgCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '15%',
    }
});