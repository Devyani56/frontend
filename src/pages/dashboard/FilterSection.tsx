import {StyleSheet, css} from "aphrodite";
import themeVars from "../../util/themeVars";
import {pollutantNames} from "../../util/pollutants-info";
import {useState} from "react";
// const [filterOptions, setFilterOptions] = useState({metric: "All", duration: "Daily", startDate: today, endDate: monthBack});
interface  IFilterSectionProps {
    filterOptions: {metric: string, duration: string, startDate: Date, endDate: Date};
    setFilterOptions: (filterOptions: {metric: string, duration: string, startDate: Date, endDate: Date}) => void;
}
const FilterSection = ({filterOptions, setFilterOptions} : IFilterSectionProps) => {
    const metrics = ["All", ...pollutantNames]

    const changeDuration = (duration: string) => {
        setFilterOptions({...filterOptions, duration});
    }
    return (
        <div className={css(styles.defaultFilterSection)}>
            <div className={css(styles.locationCont)}>
                <div className={css(styles.locationHead)}>
                    Showing stats for
                </div>
                <div className={css(styles.locationName)}>
                    Farmagudi, Goa, India
                </div>

            </div>
            <div className={css(styles.filterCont)}>
                <div className={css(styles.dataFilterCont)}>
                    <select name={"metrics"} id={"metrics"} className={css(styles.dataFilter)} onChange={(e) => setFilterOptions({...filterOptions, metric: e.target.value})}>
                        {metrics.map((metric) => {
                            return <option value={metric}>{metric}</option>
                        }
                        )}
                    </select>
                </div>
                <div className={css(styles.durationFilterCont)}>
                    <button
                        className={css(styles.durationFilter, styles.durationFilterLeft, filterOptions.duration === "Daily" && styles.durationFilterActive)}
                        onClick={() => changeDuration("Daily")}
                    >
                        Daily
                    </button>
                    <button
                        className={css(styles.durationFilter, styles.durationFilterMiddle, filterOptions.duration === "Weekly" && styles.durationFilterActive)}
                        onClick={() => changeDuration("Weekly")}

                    >
                        Weekly
                    </button>
                    <button className={css(styles.durationFilter, styles.durationFilterRight, filterOptions.duration === "Monthly" && styles.durationFilterActive)}
                        onClick={() => changeDuration("Monthly")}
                    >
                        Monthly
                    </button>

                </div>
                <div className={css(styles.timeFilterCont)}>
                    <input type={"date"} name={"start-date"} className={css(styles.timeFilter)} />
                    <input type={"date"} name={"end-date"} className={css(styles.timeFilter)}/>
                </div>

            </div>
        </div>
    )
}

export default FilterSection


const styles = StyleSheet.create(
    {
        defaultFilterSection: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

        locationCont: {

        },

        filterCont: {
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'flex-end',

        },

        dataFilter: {
            width: '13rem',
            height: '3.2rem',
            border: 'none',
            padding: '0 1rem',
            appearance: 'none',
            borderRadius: '2rem',
            color: themeVars.colors.text.accentGrey,
            fontSize: '1rem',
            fontWeight: 600,
        //      add a dropDown icon in the right replacing the caret
            background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%23fff' d='M10 13.414l-6.707-6.707 1.414-1.414L10 10.586l5.293-5.293 1.414 1.414z'/></svg>") no-repeat right 0.75rem center/9px 9px`,
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            letterSpacing: '0.065em',

            ':focus': {
                outline: 'none',
            }
        },

        locationHead: {
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '1.8rem',
            color: themeVars.colors.text.accentGrey,

        },

        locationName: {
            fontStyle: 'normal',
            fontWeight: 800,
            fontSize: '1.8rem',
            color: themeVars.colors.text.accentGrey,

        },

        dataFilterCont: {

        },

        durationFilterCont: {

        },

        timeFilterCont: {

        },

        durationFilter: {
            width: '8rem',
            height: '3.2rem',
            border: 'none',
            padding: '0 1rem',
            borderRadius: '2rem',
            color: themeVars.colors.text.accentGrey,
            fontSize: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            letterSpacing: '0.065em',
            fontWeight: 600,
            ':focus': {
                outline: 'none',
            }
        },

        durationFilterLeft: {
            borderRadius: '2rem 0 0 2rem',
            borderRight: '0.5px solid rgba(256, 256, 256, 0.08)',

        },

        durationFilterActive: {
            backgroundColor: 'rgba(256, 256, 256, 0.03)',
        },

        durationFilterMiddle: {
            borderRadius: '0',
            borderRight: '0.5px solid rgba(256, 256, 256, 0.08)',

        },

        durationFilterRight: {
            borderRadius: '0 2rem 2rem 0',

        },

        timeFilter: {
            width: '10rem',
            height: '3.2rem',
            border: 'none',
            padding: '0 1rem',
            borderRadius: '2rem',

            ':first-child': {
                borderRadius: '2rem 0 0 2rem',
                borderRight: '0.5px solid rgba(256, 256, 256, 0.08)',
            },

            ':last-child': {
                borderRadius: '0 2rem 2rem 0',
            },

            color: themeVars.colors.text.accentGrey,
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.065em',

            background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%23fff' d='M10 13.414l-6.707-6.707 1.414-1.414L10 10.586l5.293-5.293 1.414 1.414z'/></svg>") no-repeat right 0.75rem center/9px 9px`,
            backgroundColor: 'rgba(0, 0, 0, 0.08)',

            ':focus': {
                outline: 'none',
            },

        //     remove the date picker icon
            '::-webkit-calendar-picker-indicator': {
                opacity: 0,
            }

        },

    //     make left one border radius and right one border radius

    }
)


