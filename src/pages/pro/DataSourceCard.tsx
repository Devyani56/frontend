import {StyleSheet, css} from "aphrodite";
import headerImg from '../../assets/images/headerimg.png';
import themeVars from "../../util/themeVars";
import {CaretRight, Person, GitCommit, DotsThree} from "phosphor-react";
import {IDataSourceData} from "./IDataSource";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


interface IDataSourceCardProps {
    data : IDataSourceData
}

const DataSourceCard = ({data}:IDataSourceCardProps) => {
    const isOnline = false;

    //  navigate to the data source page
    const navigator = useNavigate();

    const handleCardClick = () => {
        navigator(`/pro/data/${data.id}`);
    }


    return (
        <div className={css(styles.dataSourceCards)}>

            <div className={css(styles.dataSourceCardHeader)}>
                <button className={css(styles.moreOptions)}><DotsThree size={32} weight="bold" /></button>
                <div className={css(styles.dataSourceInfo)}>
                    <div className={css(styles.dataSourceName)}>{data.name}</div>
                    <div className={css(styles.dataSourceAddress)}>{data.location.address}</div>
                </div>
                <img src={headerImg} alt="headerImg" className={css(styles.headerImg)}/>
                {isOnline ?
                    <div className={css(styles.dataSourceOnline)}>
                        <div className={css(styles.onlineCircle)}></div>
                    Online
                </div>
                : <div className={css(styles.dataSourceLastUpdate)}>
                    <div className={css(styles.offlineCircle)}/>
                        2 hours ago
                    </div>
                }
                <div className={css(styles.dataSourceCardHeaderOverlay)}/>
            </div>


            <div className={css(styles.dataSourceCardBody)}>
                <div className={css(styles.parametersBox)}>
                    {Object.entries(data.metrics).map(([index, value]) => {
                        return (
                            value ?
                            <div className={css(styles.parameter)} key={index}>
                                {value}
                            </div> : null
                        )
                    })}
                </div>
                <div className={css(styles.latLngTypeCont)}>
                    <div className={css(styles.latLng)}>
                        <div className={css(styles.latLngVal, styles.latLngValLeft)}>{data.location.lat}<span>&#176;</span> N</div>
                        <div className={css(styles.latLngVal, styles.latLngValRight)}>{data.location.lng}<span>&#176;</span> E</div>
                    </div>
                    <div className={css(styles.dataSourceType)}>
                        {data.type === 'sensor' ?
                            <div className={css(styles.dataSourceTypeVal)}>
                                 <GitCommit size={16} weight="bold" /> Sensor
                            </div>
                            :
                            <div className={css(styles.dataSourceTypeVal)}>
                                <Person size={16} weight="bold" /> Manual
                            </div>
                        }
                    </div>
                </div>
                <div className={css(styles.dataSourceDescription)}>
                    {data.description}
                </div>

                <div className={css(styles.buttonCont)}>
                    <button
                        className={css(styles.dataButton)}
                        onClick={handleCardClick}
                    >View Data</button>
                    {/*<button className={css(styles.infoButton)}>Source Info <CaretRight size={14} weight="bold" /></button>*/}

                </div>
            </div>
        </div>
    )
}

export default DataSourceCard

const styles = StyleSheet.create(
    {
        dataSourceCards: {
            width: '30rem',
            height: '30rem',
            // backgroundColor: themeVars.colors.others.borderGrey,
            backgroundColor: themeVars.colors.backgrounds.lightest,
            borderRadius: '2rem',
        },

        dataSourceCardHeader: {
            width: '100%',
            height: '10rem',
            borderRadius: '2rem 2rem 0 0',
            position: 'relative',

        },

        dataSourceCardBody: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '20rem',
            boxSizing: 'border-box',

        },

        headerImg: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '1.5rem 1.5rem 0 0',
            position: 'absolute',

        },

        dataSourceCardHeaderOverlay: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(36,68,53,0.93)',
            opacity: 0.6,
            borderRadius: '1.5rem 1.5rem 0 0',
        },

        dataSourceName: {

            color: 'white',
            fontSize: '1.6rem',
            zIndex: 1000,
        },

        dataSourceAddress: {
            // position ot in bottom left corner
            color: 'rgba(184,198,199,0.93)',
            fontSize: '1rem',
            fontWeight: 500,
            zIndex: 1000,

        },

        dataSourceOnline: {
            position: 'absolute',
            bottom: '1rem',
            right: '2rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            // position ot in bottom right corner
            color: '#0f0',
            fontSize: '1.2rem',
            zIndex: 1000,

        },

        onlineCircle: {
            width: '1rem',
            height: '1rem',
            borderRadius: '50%',
            backgroundColor: '#0f0'
        },

        dataSourceInfo: {
            position: 'absolute',
            bottom: '1rem',
            left: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            width: '60%',
        },

        dataSourceLastUpdate: {
            position: 'absolute',
            bottom: '1rem',
            right: '2rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: '#ffcc00',
            fontSize: '1.2rem',
            zIndex: 1000,
        },

        offlineCircle: {
            width: '1rem',
            height: '1rem',
            borderRadius: '50%',
            backgroundColor: '#ffcc00',
        },

        infoButton: {
            border: 'none',
            backgroundColor: 'transparent',
            color: themeVars.colors.text.accentGrey,

            fontSize : '1.6rem',
            fontWeight: 600,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0rem',

            ':hover': {
                cursor: 'pointer',
                textDecoration: 'underline',
            }

        },

        dataButton: {
            border: 'none',
            backgroundColor: themeVars.colors.accent.darkGreen,
            color: 'white',
            padding: '1rem 3rem',
            borderRadius: '0 0 2rem 2rem',
            fontSize : '1.6rem',
            fontWeight: 600,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0rem',
            width: '100%',


            ':hover': {
                cursor: 'pointer',
                backgroundColor: themeVars.colors.accent.darGreen2,
                textDecoration: 'underline',
            }

        },

        buttonCont: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '100%',
            height: '100%',

        },

        latLngTypeCont: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1rem 2rem',

        },

        latLng: {
            display: 'flex',
            flexDirection: 'row',
        },

        dataSourceType: {

        },

        latLngVal: {
            color: themeVars.colors.text.accentGrey,
            fontSize: '1rem',
            fontWeight: 600,
            border: '1px solid rgba(184,198,199,0.93)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.2rem 1rem',

        },

        latLngValLeft: {
            borderRadius: '0.5rem 0 0 0.5rem',
        },

        latLngValRight: {
            borderLeft: 'none',
            borderRadius: '0 0.5rem 0.5rem 0',
        },

        dataSourceTypeVal: {
            color: themeVars.colors.text.accentGrey,
            fontSize: '1rem',
            fontWeight: 600,
            backgroundColor: themeVars.colors.others.borderGrey,
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0.5rem',
        },

        parametersBox: {
            width: '100%',
            padding: '1rem 4rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
            boxSizing: 'border-box',
            backgroundColor: themeVars.colors.others.borderGrey,

        },

        parameter: {
            fontSize: '1.2rem',
            fontWeight: 500,
            color: themeVars.colors.accent.darkGreen,
        },

        moreOptions: {
            position: 'absolute',
            top: '0.1rem',
            right: '0.1rem',
            zIndex: 1000,
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',

            ':hover': {
                cursor: 'pointer',
            }
        },

        dataSourceDescription: {
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            fontWeight: 500,
            color: themeVars.colors.text.accentGrey,
        }

    }
)
