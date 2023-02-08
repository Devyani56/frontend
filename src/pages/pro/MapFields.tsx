import {StyleSheet, css} from "aphrodite";
import themeVars from "../../util/themeVars";
import Input from "../../components/Input";
import Button from "../../components/buttons/Button";
import VerticalGap from "../../components/VerticalGap";
const MapFields = ({dataFieldMapping, setDataFieldMapping, headers, setDateFormat, dateFormat,onParseData} : any) => {
    const fields = ["none", "dataSourceId", "recordedAt", "metrics"]

    const handleSelect = (event:any, header:string) => {
        const value = event.target.value;
        if (value === "dataSourceId") {
            setDataFieldMapping({...dataFieldMapping, dataSourceId: header});
        }

        if (value === "recordedAt") {
            setDataFieldMapping({...dataFieldMapping, recordedAt: header});
        }

        if (value === "metrics") {
            setDataFieldMapping({...dataFieldMapping, metrics: [...dataFieldMapping.metrics, header]});
        }
    }
    return (
        <div className={css(styles.mapFields)}>
            <div className={css(styles.mapFieldsHeader)}>Map Fields</div>
            <div className={css(styles.mapFieldsDescription)}>
                Please map the fields in your CSV file to the fields in the database. This helps us to keep uploading the data flexible and easy.
            </div>
            <VerticalGap gap={'1.2rem'}/>
            <Input
                type="input"
                name="date-format"
                placeHolder={"Date Time Format eg. YYYY-MM-DD"}
                onChange={(e) => {setDateFormat(e.target.value)}}
                label={"Date Time Format"}
                value={dateFormat}
            />
            <VerticalGap gap={'1rem'}/>
            <div className={css(styles.mapFieldsCont)}>
                {headers.map((header : any) => {
                    return (
                        <div key={header} className={css(styles.mapFieldsEleCont)}>
                            <div className={css(styles.mapLabel)}> {header}</div>
                            <select onChange={(e) => {handleSelect(e, header)}} className={css(styles.selector)}>
                                {fields.map((field : any) => {
                                    return (
                                        <option key={field} value={field}>{field}</option>
                                    );
                                })}
                            </select>
                        </div>
                    );
                })
                }
            </div>
            <VerticalGap gap={'2rem'}/>

            <Button type={"long"} color={themeVars.colors.accent.darkGreen} onClick={onParseData}> Parse Data</Button>
        </div>
    );
}

export default MapFields;

const styles = StyleSheet.create({
    mapFields: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        padding: " 2rem 4rem",
        boxSizing: "border-box",
        backgroundColor: themeVars.colors.backgrounds.lightest,
        borderRadius: "2rem",
    },

    mapFieldsHeader: {
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "2.4rem",
        lineHeight: "3.2rem",
    },

    mapFieldsDescription: {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "1.6rem",
        lineHeight: "2.4rem",
        color: themeVars.colors.text.accentGrey,
    },

    mapFieldsCont: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
    //    set grid column gap
        gridColumnGap: '8rem',
    },

    mapLabel: {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "1.6rem",
        lineHeight: "2.4rem",
        color: themeVars.colors.accent.black,
        width: "15rem",
    },

    mapFieldsEleCont: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    selector: {
        width: "100%",
        height: "4rem",
        border: "1px solid #E5E5E5",
        padding: "0 1rem",
        boxSizing: "border-box",
        // make the caret logo shift a bit to the left

        background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23BDBDBD' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'><polyline points='6 9 12 15 18 9'></polyline></svg>") no-repeat right 0.75rem center/8px 8px`,
        // make the caret logo shift a bit to the left
        backgroundPosition: "calc(100% - 1.5rem) center",
        // make the caret logo shift a bit to the left
        backgroundSize: "8px 8px",
        // make the caret logo shift a bit to the left
        appearance: "none",
        borderRadius: "1rem",

    }
})
