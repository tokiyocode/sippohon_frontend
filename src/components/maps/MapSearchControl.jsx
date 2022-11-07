import { GeoSearchControl } from 'leaflet-geosearch';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import '../../../node_modules/leaflet-geosearch/dist/geosearch.css';
import SippohonProvider from '../../utils/SippohonProvider';

const MapSearchControl = ({onSearch}) => {
    const map = useMap();
    const provider = new SippohonProvider({onSearch});

    useEffect(() => {
        const searchControl = new GeoSearchControl({
            provider,
            style: "bar",
            searchLabel: "Cari...",
            showMarker: false,
        });

        map.addControl(searchControl); 
        return () => map.removeControl(searchControl)
    }, []);


    return null;
}

export default MapSearchControl;