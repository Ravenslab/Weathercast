// Map.tsx
"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

// Fix default marker icons
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type LatLngTuple = [number, number];

interface MapProps {
    onPointClick: (latLng: LatLngTuple) => void; // <-- callback to parent
}

interface MapClickHandlerProps {
    setMarkerPos: React.Dispatch<React.SetStateAction<LatLngTuple | null>>;
    onPointClick: (latLng: LatLngTuple) => void;
}

function MapClickHandler({ setMarkerPos, onPointClick }: MapClickHandlerProps) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            const coords: LatLngTuple = [lat, lng];
            setMarkerPos(coords);
            onPointClick(coords); // <-- emit to parent
        },
    });
    return null;
}

export default function Map({ onPointClick }: MapProps) {
    const [markerPos, setMarkerPos] = useState<LatLngTuple | null>(null);

    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markerPos && <Marker position={markerPos} />}
            <MapClickHandler setMarkerPos={setMarkerPos} onPointClick={onPointClick} />
        </MapContainer>
    );
}
