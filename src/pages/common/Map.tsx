import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {useEffect, useState} from "react";
import L from 'leaflet';
import {getDataSourceAPi} from "../../util/api/get-datasources-api";

const iconGood = new L.Icon({
//     it will be a green circle
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const iconBad = new L.Icon({
//     it will be a red circle
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const iconMedium = new L.Icon({
//     it will be a yellow circle
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface IMapProps {
    // cordinates is an array of numbers
    coordinate: [number, number];
    stations?: any;
    zoom: number;
}

const Map = ({coordinate, zoom} : IMapProps) => {
    // trigger a window resize event to force leaflet to resize the map


    const [dataSources, setDataSources] = useState<any>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const getDataSources = async () => {
        setLoading(true)
        const response = await getDataSourceAPi();
        if (response.type === "success"){
            setDataSources(response.data);
        }
        setLoading(false)
    }

    useEffect(() => {
        getDataSources();
        console.log("dataSources--", dataSources)
    }
    , [])

    useEffect(() => {
            console.log("stations cordinates", coordinate)
            window.dispatchEvent(new Event('resize'));
        }
        , [coordinate, loading]);


    return (
            <MapContainer center={[...coordinate]} zoom={zoom} scrollWheelZoom={false} style={{height: '100%', width: '100%'}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    dataSources.map((station: any) => {
                        console.log("station", station.location.lat)
                        return (
                            <Marker position={[station.location.lat, station.location.lng]}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        )
                    })
                }


            </MapContainer>
    );
}

export default Map;
