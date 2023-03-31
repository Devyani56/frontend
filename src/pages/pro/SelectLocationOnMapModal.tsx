// @ts-nocheck
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {css, StyleSheet} from "aphrodite";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import themeVars from "../../util/themeVars";

interface DragMarkerProps {
    setPos: (pos: { lat: number, lng: number }) => void;
    pos : { lat: number, lng: number };
}

interface SelectLocationOnMapModalProps {
    setPos: (pos: { lat: number, lng: number }) => void;
    onClose: () => void;
    onSubmit: (any) => void;
    pos: { lat: number, lng: number };

}

function DraggableMarker({setPos, pos} : DragMarkerProps ) {
    const [draggable, setDraggable] = useState(true)
    const [position, setPosition] = useState(pos)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                    setPos(marker.getLatLng())
                }
            },
        }),
        [],
    )

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup minWidth={90}>
                <div className={css(styles.latlng)}>
                    <div>{position.lat.toFixed(6)}</div>
                    <div>{position.lng.toFixed(6)}</div>
                </div>

            </Popup>
        </Marker>
    )
}



const SelectLocationOnMapModal = ({pos, setPos, onClose, onSubmit} : SelectLocationOnMapModalProps) => {

    useEffect(() => {

            window.dispatchEvent(new Event('resize'));
        }
        , []);

    const [currentPos, setCurrentPos] = useState({lat: 15.299326, lng: 74.123993} as { lat: number, lng: number } | null);
    const doneSelect = () => {
        console.log(currentPos);
        onSubmit(currentPos)

    }

    return (
        <div className={css(styles.mapSelect)}>
            <MapContainer
                center={[15.299326, 74.123993]}
                zoom={9} scrollWheelZoom={false}
                style={{height: '100%', width: '100%'}}

            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DraggableMarker setPos={setCurrentPos} pos={pos}/>

            </MapContainer>
            <button className={css(styles.selectBtn)} onClick={() => doneSelect(currentPos)}>Select This Location</button>
        </div>
    );
}

export default SelectLocationOnMapModal;

const styles = StyleSheet.create({
    mapSelect: {
        height: '100%',
        width: '100%',
        position: 'fixed',
        zIndex: 100,
        boxSizing: 'border-box',
    },

    latlng: {
        display: 'flex',
        justifyContent: 'center',
        height: '20px',
        gap:  '10px',
        alignItems: 'center',
    },

    selectBtn: {
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 20px',
        backgroundColor: themeVars.colors.accent.darkGreen,
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        outline: 'none',
        ':hover': {
            backgroundColor: themeVars.colors.accent.darGreen2,
            color: '#fff',
        },
        zIndex: 1000,
    }
})