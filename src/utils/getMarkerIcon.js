import L from "leaflet";

export default function getMarkerIcon(iconSize, url) {
    return L.icon({
        iconSize: iconSize,
        iconUrl: url
    });
}