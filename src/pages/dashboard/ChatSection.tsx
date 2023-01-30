import {css, StyleSheet} from "aphrodite";
import MyResponsiveLine from "./MyResponsiveLine";
import themeVars from "../../util/themeVars";
import Button from "../../components/buttons/Button";
import {CaretDown} from "phosphor-react";
const data = [
    {
        "id": "japan",
        "color": "hsl(260, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 116
            },
            {
                "x": "helicopter",
                "y": 118
            },
            {
                "x": "boat",
                "y": 158
            },
            {
                "x": "train",
                "y": 22
            },
            {
                "x": "subway",
                "y": 100
            },
            {
                "x": "bus",
                "y": 117
            },
            {
                "x": "car",
                "y": 243
            },
            {
                "x": "moto",
                "y": 71
            },
            {
                "x": "bicycle",
                "y": 275
            },
            {
                "x": "horse",
                "y": 209
            },
            {
                "x": "skateboard",
                "y": 271
            },
            {
                "x": "others",
                "y": 86
            }
        ]
    },
    {
        "id": "france",
        "color": "hsl(227, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 270
            },
            {
                "x": "helicopter",
                "y": 255
            },
            {
                "x": "boat",
                "y": 76
            },
            {
                "x": "train",
                "y": 117
            },
            {
                "x": "subway",
                "y": 184
            },
            {
                "x": "bus",
                "y": 54
            },
            {
                "x": "car",
                "y": 171
            },
            {
                "x": "moto",
                "y": 15
            },
            {
                "x": "bicycle",
                "y": 137
            },
            {
                "x": "horse",
                "y": 238
            },
            {
                "x": "skateboard",
                "y": 201
            },
            {
                "x": "others",
                "y": 119
            }
        ]
    },
    {
        "id": "us",
        "color": "hsl(312, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 175
            },
            {
                "x": "helicopter",
                "y": 190
            },
            {
                "x": "boat",
                "y": 47
            },
            {
                "x": "train",
                "y": 196
            },
            {
                "x": "subway",
                "y": 132
            },
            {
                "x": "bus",
                "y": 182
            },
            {
                "x": "car",
                "y": 232
            },
            {
                "x": "moto",
                "y": 16
            },
            {
                "x": "bicycle",
                "y": 60
            },
            {
                "x": "horse",
                "y": 80
            },
            {
                "x": "skateboard",
                "y": 217
            },
            {
                "x": "others",
                "y": 50
            }
        ]
    },
    {
        "id": "germany",
        "color": "hsl(319, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 154
            },
            {
                "x": "helicopter",
                "y": 199
            },
            {
                "x": "boat",
                "y": 60
            },
            {
                "x": "train",
                "y": 36
            },
            {
                "x": "subway",
                "y": 90
            },
            {
                "x": "bus",
                "y": 100
            },
            {
                "x": "car",
                "y": 30
            },
            {
                "x": "moto",
                "y": 216
            },
            {
                "x": "bicycle",
                "y": 199
            },
            {
                "x": "horse",
                "y": 147
            },
            {
                "x": "skateboard",
                "y": 94
            },
            {
                "x": "others",
                "y": 115
            }
        ]
    },
    {
        "id": "norway",
        "color": "hsl(63, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 257
            },
            {
                "x": "helicopter",
                "y": 25
            },
            {
                "x": "boat",
                "y": 114
            },
            {
                "x": "train",
                "y": 143
            },
            {
                "x": "subway",
                "y": 97
            },
            {
                "x": "bus",
                "y": 284
            },
            {
                "x": "car",
                "y": 169
            },
            {
                "x": "moto",
                "y": 116
            },
            {
                "x": "bicycle",
                "y": 103
            },
            {
                "x": "horse",
                "y": 80
            },
            {
                "x": "skateboard",
                "y": 36
            },
            {
                "x": "others",
                "y": 14
            }
        ]
    }
]
const ChartSection = () => {
    return (
        <div className={css(styles.chartSectionDefault)}>
            {/*<div className={css(styles.chartFiltersLocationCont)}>*/}
            {/*    <div className={css(styles.statsForCont)}>*/}
            {/*        Showing Stats for <br/>*/}
            {/*        Farmagudi, Goa, India*/}
            {/*    </div>*/}
            {/*    <div className={css(styles.FilterCont)}>*/}
            {/*        <div className={css(styles.Filter)}>*/}
            {/*            <button className={css(styles.generalButton)}>Filter <CaretDown size={20} /></button>*/}
            {/*        </div>*/}
            {/*        <div className={css(styles.Interval)}>*/}
            {/*            <button className={css(styles.generalButton)}>Daily</button>*/}
            {/*            <button className={css(styles.generalButton)}>Weekly</button>*/}
            {/*            <button className={css(styles.generalButton)}>Monthly</button>*/}

            {/*        </div>*/}
            {/*        <div className={css(styles.DateRange)}>*/}
            {/*            <input className={css(styles.generalButton)} type="date" name="start-date"/>*/}
            {/*            <input className={css(styles.generalButton)} type="date" name={"end-date"}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={css(styles.chartContainer)}>*/}
                <MyResponsiveLine data={data}/>
            {/*</div>*/}
        </div>
    );
};

export default ChartSection;

const styles = StyleSheet.create(
    {
        chartSectionDefault: {
            // backgroundColor: "transparent",
            height: "30rem",
            width: "90%"
        },

        chartContainer: {
            width: "100%",
            height: "30rem",

        },

        chartFiltersLocationCont: {
            width: "100%",
            height: "5rem",
            display: 'flex',
            justifyContent: 'space-between'

        },

        statsForCont: {
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "1.6rem",
            lineHeight: "2rem",
            color: themeVars.colors.text.accentGrey
        },

        FilterCont: {
            backgroundColor: 'green',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 2fr'
        },

        Filter: {

        },

        Interval: {

        },

        DateRange: {

        },
        generalButton: {

        }
    }
)
