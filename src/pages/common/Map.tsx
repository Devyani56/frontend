import {MapContainer, TileLayer} from 'react-leaflet'
import {useEffect} from "react";

const Map = () => {
    // trigger a window resize event to force leaflet to resize the map
    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }
    , []);
    return (
            <MapContainer center={[15.299326, 74.123993]} zoom={8} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
    );
}

export default Map;
