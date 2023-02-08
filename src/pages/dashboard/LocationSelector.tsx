import {StyleSheet, css} from 'aphrodite';
import themeVars from "../../util/themeVars";
import {CaretDown, Crosshair} from "phosphor-react";
import {useEffect, useState} from "react";
import {getDataSourceAPi} from "../../util/api/get-datasources-api";

interface ILocationSelectorProps {
    location: {
        "sourceId": string,
        "sourceName": string,
        "sourceType": string,
        "sourceLat": number,
        "sourceLng": number,
        address: string
    }

    setLocation: (location: {
        "sourceId": string,
        "sourceName": string,
        "sourceType": string,
        "sourceLat": number,
        "sourceLng": number,
        address: string
    }) => void
}
const LocationSelector = ({location, setLocation}:ILocationSelectorProps) => {

    const [allLocations, setAllLocations] = useState<any>([]);

    const getLocations = async () => {
        const response = await getDataSourceAPi()
        let data : any = []
        if(response.type === "success") {
            data = response.data;
            return data;
        }
        if(!data || data.length === 0 ) {
            return;
        }
        const locationArray = data.map((item: any) => {
            return {
                sourceId: item.id,
                sourceName: item.name,
                sourceType: item.type,
                sourceLat: item.location.lat,
                sourceLng: item.location.lng,
                address: item.location.address
            }
        })
        setAllLocations(locationArray);

    }

    useEffect(() => {
        getLocations();
    }, [])


    return (

        <div>
            <div className={css(styles.locationSelector)}>
                <select className={css(styles.locationSelectorButton)}>
                    {allLocations.map((item: any) => {
                        return (
                            <option value={item.sourceId}>{item.sourceName}</option>
                        )
                    })}
                </select>
                <button className={css(styles.gpsButton)}>
                    <Crosshair size={32}/>
                </button>
            </div>
        </div>
    );
};


export default LocationSelector;


const styles = StyleSheet.create(
    {
        locationSelector: {
            width: '30rem',
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            alignItems: 'center',


        },

        locationSelectorButton: {
            backgroundColor: 'transparent',
            color: themeVars.colors.accent.green,
            border: '1px solid ' + themeVars.colors.accent.green,
            borderRadius: '2rem',
            padding: '0.8rem 1.2rem',
            fontSize: '1.6rem',
            cursor: 'pointer',
            fontWeight: 600,
            letterSpacing: '0.1rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0.8rem',
            width: '16rem',

        //     make the caret icon move bit left
            // replace the default one and add a new one
            appearance: 'none',
        },

        gpsButton: {
            backgroundColor: 'transparent',
            color: themeVars.colors.accent.green,
            border: 'none',

        }


    }
)
