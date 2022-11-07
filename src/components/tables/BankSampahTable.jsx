import _ from "lodash";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import CircleButton from "../CircleButton";
import Table from "./Table";

const BankSampahTable = ({ data, onDelete, ...others}) => {
    const location = useLocation();

    const columns = [
        {
            title: 'Nama',
            path: 'nama'
        },
        {
            title: 'Alamat',
            path: 'alamat'
        },
        {
            title: 'Latitude',
            path: 'lat'
        },
        {
            title: 'Longitude',
            path: 'lon'
        },
        {
            title: 'Kecamatan',
            path: 'kecamatan.nama'
        },
        {key: 'modifyButtons', content: (id) => (
            <>
                <NavLink to={`${id}`} state={{from: location.pathname}} >
                    <CircleButton btnClass={"btn-success"} iconClass={"mdi-grease-pencil"} />
                </NavLink>
                <CircleButton onClick={() => onDelete(id)} btnClass={"btn-danger"} iconClass={"mdi-eraser-variant"} />
            </>
        )}
    ];

    const handleGetPageData = (searchQuery) => {
        if (searchQuery)
            return data.filter(bankSampah => (
                bankSampah.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                bankSampah.alamat.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                bankSampah.kecamatan.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(bankSampah.lat).toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(bankSampah.lon).toLowerCase().startsWith(searchQuery.toLowerCase()) 
            ));
        
        return data;
    }

    return <Table columns={columns} onGetPageData={handleGetPageData} {...others} />
}

export default BankSampahTable;