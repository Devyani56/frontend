import {css, StyleSheet} from "aphrodite";
interface IPMCardProps {
    children: any;
    gap?: string;
}
const TilesContainer = ({children, gap} : IPMCardProps) => {

    if (!gap) {
        gap = "2rem";
    }

    const customStyles = StyleSheet.create(
        {
            TilesContainerCustom: {
                gap: gap
            }
        }
    )
    return (
        <div className={css(styles.TilesContainerDefault, customStyles.TilesContainerCustom)}>
            {children}
        </div>
    );
};

export default TilesContainer;

const styles = StyleSheet.create(
    {
        TilesContainerDefault: {
            width: "100%",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }
    }
)
