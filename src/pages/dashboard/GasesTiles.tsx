import { StyleSheet, css } from "aphrodite";
import themeVars from "../../util/themeVars";
interface GasTilesProps {
  value: number;
  label: string;
  type?: "light" | "dark";
}

const GasTiles = ({ value, label, type }: GasTilesProps) => {
  if (!type) {
    type = "light";
  }

  // if value has more than 2 digits, make the font smaller
  const fontSize = value &&  value.toString().length > 2 ? "2rem" : "3.2rem";

  const customStyle = StyleSheet.create({
    font: {
      fontSize: fontSize,
    },
    dark: {
      background: "rgba(47, 65, 81, 0.26)",
      boxShadow: "0px 4px 21px rgba(0, 0, 0, 0.01)",
      borderRadius: "12px",
    },
    light: {},
  });

  return (
    <div
      className={css(styles.TilesDefault, customStyle[type], customStyle.font)}
    >
      <div className={css(styles.valueAndUnit)}>
        <div className={css(styles.TilesValue)}>{value}</div>
      </div>
      <div className={css(styles.TilesLabel)}>{label}</div>
    </div>
  );
};

export default GasTiles;

const styles = StyleSheet.create({
  TilesDefault: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: "1.2rem 0.6rem 0.6rem 0.6rem",
  },
  TilesValue: {
    fontWeight: 500,
    lineHeight: "2rem",
    letterSpacing: ".225753rem",
    textTransform: "uppercase",
    color: themeVars.colors.text.accentGrey,
    minWidth: "1rem",
    zIndex: 1000001
  },
  TilesLabel: {
    color: themeVars.colors.text.accentGrey,
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: "1.4rem",
    lineHeight: "2.4rem",
    letterSpacing: "-0.024247rem",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  valueAndUnit: {
    display: "flex",
    flexDirection: "row",
    gap: "0.1rem",
    alignItems: "flex-end",
  },
});
