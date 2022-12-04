import React from "react";
import { Polygon, Popup } from "react-leaflet";
import { NavLink, useLocation } from "react-router-dom";

const RTHPolygon = ({data, pathOptions, isUserAuthenticated}) => {
    const location = useLocation();

    const mapCoordinateToViewModel = (coordinates) => {
        let index = 1;
        return coordinates.map(coordinate => {
            if (index === coordinates.length)
                return coordinate;

            index++;
            return coordinate + ", ";
        });
    };
    
    return data.map(rth => {
        let index = 0;
        const positions = [];
        rth.lats.forEach(lat => {
            positions.push([lat, rth.lons[index++]]);
        });
        
        return (
            <Polygon key={rth._id} positions={positions} pathOptions={pathOptions}>
                <Popup>
                    <span className="marker-popup-title">Ruang Terbuka Hijau</span><br />
                    Nama: {rth.nama}<br />
                    Alamat: {rth.alamat}<br />
                    Latitudes: {mapCoordinateToViewModel(rth.lats)}<br />
                    Longitudes: {mapCoordinateToViewModel(rth.lons)}<br />
                    Kecamatan: {rth.kecamatan.nama}<br />
                    {isUserAuthenticated &&
                    <NavLink to={`/ruangTerbukaHijau/${rth._id}`} state={{from: location.pathname}}>
                        <div className="popup-btn-edit">
                            <button className="btn btn-primary text-white">
                                <i className="mdi mdi-grease-pencil" />
                            </button>
                        </div>
                    </NavLink>}
                </Popup>
            </Polygon>
        );
    });
}

export default RTHPolygon