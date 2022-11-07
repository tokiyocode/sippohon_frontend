import React from "react";
import { Marker, Popup } from "react-leaflet";
import { NavLink, useLocation } from "react-router-dom";
import getMarkerIcon from "../../utils/getMarkerIcon";

const TPAMarker = ({data, iconSize, isUserAuthenticated}) => {
    const location = useLocation();
    
    return data.map(tpa => (
        <Marker
            key={tpa._id}
            position={[tpa.lat, tpa.lon]}
            autoPanOnFocus={false}
            icon={getMarkerIcon(iconSize, require("../../assets/icons/landfill.png"))}
        >
            <Popup>
                <span className="marker-popup-title">Tempat Pembuangan Akhir</span><br />
                Alamat: {tpa.alamat}<br />
                Latitude: {tpa.lat}<br />
                Longitude: {tpa.lon}<br />
                Kecamatan: {tpa.kecamatan.nama}<br />
                {isUserAuthenticated && 
                <NavLink to={`/tempatPembuanganAkhir/${tpa._id}`} state={{from: location.pathname}} >
                    <div className="popup-btn-edit">
                        <button className="btn btn-primary text-white">
                            <i className="mdi mdi-grease-pencil" />
                        </button>
                    </div>
                </NavLink>}
            </Popup>
        </Marker>
    ));
}

export default TPAMarker;