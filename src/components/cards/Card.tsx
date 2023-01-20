import {css, StyleSheet} from "aphrodite";
import themeVars from "../../util/themeVars";

interface ICardProps {
    type: "cardLight" | "cardDark";
    width?: string;
    height?: string;
    children?: any;
}
const Card = ({type, width, height, children} : ICardProps) => {
    // create a style with width and height if they are passed in
    const style = StyleSheet.create(
        {
            cardCustom: {
                width: width? width : "100%",
                height: height? height: "auto",
            }
        });

    return (
        <div className={css(styles[type], style.cardCustom, styles.cardDefault)}>
            {children}
        </div>
    );
}
export default Card;

const styles = StyleSheet.create(
    {
        cardLight : {
            backgroundColor: themeVars.colors.accent.light,
            boxShadow: "15px 15px 35px 1px rgba(0, 0, 0, 0.06)",
            borderRadius: themeVars.dimensions.border.standardRadius,

        },
        cardDark : {
            backgroundColor: themeVars.colors.accent.dark,
            boxShadow:"15px 15px 35px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(4.5px)",
            borderRadius: themeVars.dimensions.border.standardRadius,

        },
        cardDefault: {
            padding: "1rem 2rem",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        }

    }
)
