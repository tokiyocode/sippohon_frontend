import React from "react";
import {
    Marker,
    Popup
} from "react-leaflet";
import { NavLink, useLocation } from "react-router-dom";
import getMarkerIcon from "../../utils/getMarkerIcon";

const PohonMarker = ({data, iconSize, isUserAuthenticated}) => {
    const location = useLocation();

    return data.map(pohon => (
        <Marker
            key={pohon._id}
            position={[pohon.lat, pohon.lon]}
            icon={getMarkerIcon(iconSize, require("../../assets/icons/tree.png"))}
            autoPanOnFocus={false} // this prop is set to handle bug of leaflet that showing an error when opening popup with a custom icon
        >
            <Popup>
                <span className="marker-popup-title">Pohon</span><br/>
                Nama: {pohon.nama}<br/>
                Alamat: {pohon.alamat}<br/>
                Latitude: {pohon.lat}<br/>
                Longitude: {pohon.lon}<br/>
                Umur: {pohon.umur} Tahun<br/>
                Tinggi: {pohon.tinggi} cm<br/>
                Terakhir Perawatan: {pohon.terakhirPerawatan}<br/>
                Kecamatan: {pohon.kecamatan.nama}<br/>
                {isUserAuthenticated && 
                <NavLink to={`/pohon/${pohon._id}`} state={{from: location.pathname}} >
                    <div className="popup-btn-edit">
                        <button className="btn btn-primary text-white">
                            <i className="mdi mdi-grease-pencil" />
                        </button>
                    </div>
                </NavLink>}
            </Popup>
        </Marker>
    )
);    
}

export default PohonMarker;