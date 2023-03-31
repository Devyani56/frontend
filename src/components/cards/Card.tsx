import {css, StyleSheet} from "aphrodite";
import themeVars from "../../util/themeVars";

interface ICardProps {
    type: "cardLight" | "cardDark";
    width?: string;
    height?: string;
    children?: any;
    padding?: string;
    minWidth?: string
}
const Card = ({type, width, height, children, padding, minWidth} : ICardProps) => {
    // create a style with width and height if they are passed in
    const style = StyleSheet.create(
        {
            cardCustom: {
                width: width? width : "100%",
                height: height? height: "auto",
                padding: padding? padding: "1rem 2rem",
                minWidth: minWidth? minWidth: "auto",
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
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
        }

    }
)
