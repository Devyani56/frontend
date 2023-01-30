import {StyleSheet, css} from "aphrodite";
import themeVars from "../../util/themeVars";
import Input from "../../components/Input";
import {GitCommit, Person, Copy, ArrowsClockwise, Info} from "phosphor-react";
import Button from "../../components/buttons/Button";
import {Interface} from "readline";
import {IDataSourceData} from "./IDataSource";
import VerticalGap from "../../components/VerticalGap";

interface IAddDataSourceFormProps {
    onSubmit: (data: IDataSourceData) => void;
    formData: IDataSourceData;
    setFormData: (data: IDataSourceData) => void;
}

type Imetrics = "PM10" | "PM2.5" | "NO2" | "O3" | "SO2" | "CO" | "AQI" | "NH3";

const AddDataSourceForm = ({formData, onSubmit, setFormData}:IAddDataSourceFormProps) => {
    const handleChange = (field : string, value : any, e? : any) => {

        if (e) {
            e.preventDefault();
        }



        if (field === "name" || field === "description" || field === "id") {
           setFormData({
                ...formData,
                [field]: value
            });
        }
        else if (field === "lat" || field === "lng") {
            setFormData({
                ...formData,
                location: {
                    ...formData.location,
                    [field]: value
                }
            });
        }
        else if (field === "type") {
            setFormData({
                ...formData,
                [field]: value
            });
        }
        else if (field === "metrics") {

            setFormData({
                ...formData,
                // @ts-ignore
                metrics : {...formData.metrics, [value]: !formData.metrics[value]}
            });

        }
        else if (field === "address") {
            setFormData({
                ...formData,
                location: {
                    ...formData.location,
                    address: value
                }
            });
        }
        else if (field === "duration") {
            setFormData({
                ...formData,
                expectedFrequencyType: value,
                expectedFrequencySeconds: value === "seconds" ? 20 : value === "minutes" ? 20 * 60 : value === "hours" ? 20 * 60 * 60 : 20 * 60 * 60 * 24

            });
        }

    }

    const createDataSource = (e: any) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <div className={css(styles.formContDefault)}>
            <div className={css(styles.formHeader)}>
                Add New Data Source
            </div>
            <form className={css(styles.formDefault)}>
                <div className={css(styles.formGroup1)}>
                    <Input
                        label={"Data Source Name"}
                        name={"name"}
                        type={"input"}
                        value={formData.name}
                        onChange={(e)=>{handleChange("name", e.target.value)}}
                    />
                    <Input
                        label={"Data Source ID"}
                        name={"ID"}
                        type={"input"}
                        value={formData.id}
                        onChange={(e)=>{handleChange("id", e.target.value)}}
                    />
                    <Input
                        label={"Data Source Address"}
                        name={"address"}
                        type={"input"}
                        value={formData.location.address}
                        onChange={(e)=>{handleChange("address", e.target.value)}}
                    />
                </div>

                <div className={css(styles.formGroup2)}>
                    <div className={css(styles.typeDescription)}>
                        Select the data source type, manual data sources are for data points that are not sensors and are manually entered by the user.
                        Note that if you select a sensor you can still manually enter data for it.
                    </div>
                    <button
                        onClick={(e)=>{handleChange("type", "sensor", e)}}
                        className={css(styles.typeButton, (formData.type === "sensor") && styles.typeButtonActive)}
                    >
                        <GitCommit size={16} weight="bold" /> Sensor
                    </button>
                    <button
                        onClick={(e)=>{handleChange("type", "manual", e)}}
                        className={css(styles.typeButton, (formData.type === "manual") && styles.typeButtonActive)}
                    >
                        <Person size={16} weight="bold"/> Manual</button>
                </div>

                <div className={css(styles.formGroup3)}>
                    <div className={css(styles.formGroupHeader)}>
                        Select the metrics collected by this data source
                    </div>
                    <div className={css(styles.metricsCont)}>
                        {Object.entries(formData.metrics).map(([key, value]) => {
                            return (
                                <button
                                    onClick={(e)=>{handleChange("metrics", key, e)}}
                                    className={css(styles.metricButton, (value) && styles.metricButtonActive)}
                                >
                                    {key}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className={css(styles.formGroupGeoLoc)}>
                    <div className={css(styles.formGroupHeader)}>
                        Select how often you expect data to be collected from this data source
                    </div>
                    <div className={css(styles.latLongSelector)}>
                        <div className={css(styles.latLongCont)}>
                            <div className={css(styles.latLongLabel)}>Latitude</div>
                            <input type={"number"} step='0.000001'className={css(styles.latLongInput)} value={formData.location.lat} onChange={(e)=>{handleChange("lat", e.target.value)}}/>
                        </div>
                        <div className={css(styles.latLongCont)}>
                            <div className={css(styles.latLongLabel)}>Longitude</div>
                            <input type={"number"} step='0.0000001' className={css(styles.latLongInput)} value={formData.location.lng} onChange={(e)=>{handleChange("lng", e.target.value)}}/>
                        </div>
                    </div>
                </div>
                <div className={css(styles.formGroup3)}>
                    <Input
                        label={"Data Source description"}
                        name={"description"}
                        type={"input"}
                        value={formData.description}
                        onChange={(e)=>{handleChange("description", e.target.value)}}
                    />
                </div>
                <div className={css(styles.formGroup5)}>
                    <div className={css(styles.formGroupHeader)}>
                        Select how often you expect data to be collected from this data source
                    </div>
                    <div className={css(styles.durationCont)}>
                        <button
                            onClick={(e)=>{handleChange("duration", "days", e)}}
                            className={css(styles.durationButton1, (formData.expectedFrequencyType === 'days') && styles.durationButtonActive)}
                        >
                            Days
                        </button>
                        <button
                            onClick={(e)=>{handleChange("duration", "hours", e)}}
                            className={css(styles.durationButton2, (formData.expectedFrequencyType === 'hours') && styles.durationButtonActive)}
                        >
                            Hours
                        </button>
                        <button
                            onClick={(e)=>{handleChange("duration", "minutes", e)}}
                            className={css(styles.durationButton3, (formData.expectedFrequencyType === 'minutes') && styles.durationButtonActive)}
                        >
                            Minutes
                        </button>
                        <button
                            onClick={(e)=>{handleChange("duration", "seconds", e)}}
                            className={css(styles.durationButton4, (formData.expectedFrequencyType === 'seconds') && styles.durationButtonActive)}
                        >
                            Seconds
                        </button>
                    </div>
                </div>
                {formData.type === "sensor" && (
                    <div className={css(styles.formGroup6)}>
                        {/*<div className={css(styles.apiGroupHeader)}>*/}
                        {/*    API Key*/}
                        {/*</div>*/}
                        {/*<div className={css(styles.apiGroupSubHeader)}>*/}
                        {/*    To use sensors you need to provide an API key, data will be collected from the sensor using this API key.*/}
                        {/*</div>*/}
                        {/*<div className={css(styles.apiGroupCont)}>*/}
                        {/*    <button className={css(styles.apiGroupButton)}>*/}
                        {/*        Generate Key <ArrowsClockwise size={20} weight="bold" />*/}
                        {/*    </button>*/}
                        {/*    <div className={css(styles.apiBox)}>*/}
                        {/*        <div className={css(styles.apiBoxText)}>*/}
                        {/*            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam, amet atque impedit inventore ipsum iusto molestiae molestias natus nemo nisi obcaecati odit perferendis quibusdam recusandae reprehenderit soluta totam vel.*/}
                        {/*        </div>*/}
                        {/*        <div className={css(styles.copyButton)}>*/}
                        {/*            <Copy size={20} weight="bold" />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <Info size={32} />

                        <div className={css(styles.infoCont)}>
                            <div className={css(styles.infoHeader)}>
                                API Key required for sensors
                            </div>
                            <div className={css(styles.infoText)}>
                                To use sensors you need to provide an API key, data will be collected from the sensor using this API key.
                                You can still manually enter data for sensors, for that you don't need an API key.
                                Once sensors are added you can generate an API key for them from the data sources page.

                            </div>
                        </div>
                    </div>
                )}
                <VerticalGap gap={'3rem'}/>
                <Button type={"long"} color={themeVars.colors.accent.darkGreen} onClick={createDataSource}>
                    Submit
                </Button>
            </form>

        </div>
    )
}


export default AddDataSourceForm

const styles = StyleSheet.create(
    {
        formContDefault: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.6rem',
            width: '100%',
            maxHeight: '100rem',
            boxSizing: 'border-box',
            borderRadius: '2rem',
            backgroundColor: themeVars.colors.accent.light,
            padding: '2rem 3rem'

        },

        formHeader : {
            fontSize: '2.8rem',
            color: themeVars.colors.accent.dark,
        },

        formDefault: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.6rem',
            width: '100%',
        },

        formGroup1: {
            display: 'grid',
            gridTemplateColumns: '1fr  1fr 2fr',
            gridGap: '1.6rem',

        },

        formGroup2: {
            display: 'flex',
            flexDirection: 'row',
            gap: '1.6rem',
            justifyContent: 'flex-end',

        },

        typeButton: {
            background: 'transparent',
            border: '1px solid ' + themeVars.colors.text.accentGrey,
            borderRadius: '0.5rem',
            padding: '0.8rem 1.6rem',
            fontSize: '1.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            height: '4rem',
        },

        typeButtonActive: {
            background: themeVars.colors.accent.transparentGreen,

        },

        formGroup3: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
        },

        formGroupHeader: {
            fontSize: '1.2rem',
            color: themeVars.colors.accent.black,
            fontWeight: 'bold',
        },

        metricsCont: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            gap: '1.6rem',
            flexWrap: 'wrap',
        },

        metricButton: {
            background: 'transparent',
            border: '1px solid ' + themeVars.colors.text.accentGrey,
            borderRadius: '0.5rem',
            padding: '0.8rem 1.6rem',
            fontSize: '1.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

        metricButtonActive: {
            border: '1px solid ' + themeVars.colors.accent.darkGreen,
            color: themeVars.colors.accent.darkGreen,

        },

        formGroup5: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',

        },

        durationCont: {

        },

        durationButton1: {
            background: 'transparent',
            border: '1px solid ' + themeVars.colors.text.accentGrey,
            borderRadius: '0.5rem 0 0 0.5rem',
            padding: '0.8rem 1.6rem',
            fontSize: '1.6rem',
        },

        durationButton2: {
            background: 'transparent',
            border: '1px solid ' + themeVars.colors.text.accentGrey,
            borderRadius: '0',
            borderLeft: 'none',
            padding: '0.8rem 1.6rem',
            fontSize: '1.6rem',
        },

        durationButton3: {
            background: 'transparent',
            border: '1px solid ' + themeVars.colors.text.accentGrey,
            borderLeft: 'none',
            padding: '0.8rem 1.6rem',
            fontSize: '1.6rem',
        },

        durationButton4: {
            background: 'transparent',
            border: '1px solid ' + themeVars.colors.text.accentGrey,
            borderLeft: 'none',
            borderRadius: '0 0.5rem 0.5rem 0',
            padding: '0.8rem 1.6rem',
            fontSize: '1.6rem',
        },

        durationButtonActive: {
            background: themeVars.colors.accent.transparentGreen,
        },

        typeDescription: {
            fontSize: '1.2rem',
            color: themeVars.colors.text.accentGrey,
            flexShrink: 1,

        },



        apiGroupHeader: {
            fontSize: '1.4rem',
            color: themeVars.colors.accent.black,
            fontWeight: 'bold',
        },

        apiGroupSubHeader: {
            fontSize: '1.2rem',
            color: themeVars.colors.text.accentGrey,
        },

        apiGroupCont: {
            display: 'flex',
            flexDirection: 'row',
            gap: '1.6rem',
            alignItems: 'center',

        },

        apiBox: {
            width: '100%',
            border: '1px solid ' + themeVars.colors.others.borderGrey,
            borderRadius: '0.5rem',
            minHeight: '6rem',
            marginTop: '0.5rem',
            paddingRight: '3rem',
            position: 'relative',
        },

        apiGroupButton: {
            background: themeVars.colors.accent.darkGreen,
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.8rem 1.6rem',
            flexGrow: 1,
            flexShrink: 0,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            fontWeight: 'bold',

            ':hover': {
                cursor: 'pointer',
                backgroundColor: themeVars.colors.accent.darGreen2,
            }
        },

        apiBoxText: {
            fontSize: '1.2rem',
            color: themeVars.colors.accent.black,
            fontFamily: 'monospace',
            padding: '1.6rem',

        },

        copyButton: {
            position: 'absolute',
            right: '1.2rem',
            top: '2rem',
            background: 'transparent',

            ':hover': {
                cursor: 'pointer',
            }

        },

        formGroup6: {
            display: 'flex',
            flexDirection: 'row',
            gap: '1.6rem',
            alignItems: 'center',
            backgroundColor: themeVars.colors.others.borderGrey,
            padding: '1.6rem',
            borderRadius: '1rem',

        },

        infoCont: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',


        },

        infoHeader: {
            fontSize: '1.4rem',
            color: themeVars.colors.accent.black,
            fontWeight: 'bold',

        },

        infoText: {
            fontSize: '1.2rem',
            color: themeVars.colors.accent.black,
        },

        formGroupGeoLoc : {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',

        },

        latLongSelector : {
            display: 'flex',
            flexDirection: 'row',
            gap: '1.6rem',

        },

        latLongCont : {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',

        },

        latLongLabel : {
            width: '7.2rem',
            fontSize: '1.4rem',
            fontColor: themeVars.colors.accent.black,
            fontWeight: 'bold',
            border: '1px solid ' + themeVars.colors.text.accentGrey,
            padding: '0.8rem 1.6rem',
            borderRight : 'none',
            borderRadius: '0.5rem 0 0 0.5rem',

        },

        latLongInput : {
            border: '1px solid ' + themeVars.colors.text.accentGrey,
            padding: '0.8rem 1.6rem',
            borderRadius: '0 0.5rem 0.5rem 0',
            fontSize: '1.4rem',

            ':focus': {
                outline: 'none',
            }

        }







    }
)
