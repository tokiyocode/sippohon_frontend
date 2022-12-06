import React from "react";
import { Buffer } from "buffer";
import { Marker, Popup } from "react-leaflet";
import { NavLink, useLocation } from "react-router-dom";
import getMarkerIcon from "../../utils/getMarkerIcon";

const TPSMarker = ({
    data, 
    iconSize, 
    isUserAuthenticated
}) => {
    const location = useLocation();

    return data.map(tps => {
        const { foto } = tps;
        const fotoBase64Str = foto ? Buffer.from(foto.data).toString("base64") : null;

        return (
            <Marker
                key={tps._id}
                position={[tps.lat, tps.lon]}
                icon={getMarkerIcon(iconSize, require("../../assets/icons/trash_can.png"))}
                autoPanOnFocus={false}
            >
                <Popup>
                    <span className="marker-popup-title">Tempat Pembuangan Sampah</span><br />
                    Alamat: {tps.alamat}<br />
                    Latitude: {tps.lat}<br />
                    Longitude: {tps.lon}<br />
                    Kecamatan: {tps.kecamatan.nama}
                    {fotoBase64Str && <img className="marker-image" src={`data:${foto.contentType};base64,${fotoBase64Str}`} alt=""/>}
                    {isUserAuthenticated && 
                    <NavLink to={`/tempatPembuanganSampah/${tps._id}`} state={{from: location.pathname}} >
                        <div className="popup-btn-edit">
                            <button className="btn btn-primary text-white">
                                <i className="mdi mdi-grease-pencil" />
                            </button>
                        </div>
                    </NavLink>}
                </Popup>
            </Marker>
        );
    });
}

export default TPSMarker;