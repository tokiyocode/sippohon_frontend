import React from "react";
import getMarkerIcon from "../../utils/getMarkerIcon";
import { Marker, Popup } from "react-leaflet";
import { NavLink, useLocation } from "react-router-dom";
import { Buffer } from "buffer";

const BankSampahMarker = ({
    data, 
    iconSize, 
    isUserAuthenticated
}) => {
    const location = useLocation();

    return data.map(bankSampah => {
        const { foto } = bankSampah;
        const fotoBase64Str = foto ? Buffer.from(foto.data).toString("base64") : null;
        return (
            <Marker
                key={bankSampah._id}
                position={[bankSampah.lat, bankSampah.lon]}
                icon={getMarkerIcon(iconSize, require("../../assets/icons/waste_bank.png"))}
                autoPanOnFocus={false}
            >
                <Popup>
                    <span className="marker-popup-title">Bank Sampah</span><br/>
                    Nama: {bankSampah.nama}<br/>
                    Alamat: {bankSampah.alamat}<br/>
                    Latitude: {bankSampah.lat}<br/>
                    Longitude: {bankSampah.lon}<br/>
                    Kecamatan: {bankSampah.kecamatan.nama}<br/>
                    {fotoBase64Str && <img className="marker-image" src={`data:${foto.contentType};base64,${fotoBase64Str}`} alt=""/>}
                    {isUserAuthenticated && 
                    <NavLink to={`/bankSampah/${bankSampah._id}`} state={{from: location.pathname}} >
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

export default BankSampahMarker;