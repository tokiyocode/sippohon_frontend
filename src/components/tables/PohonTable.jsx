import React, { useEffect, useState } from "react";
import { getAllPohon } from "../../services/pohonService";
import Table from "./Table";
import _ from "lodash";
import { NavLink, useLocation } from "react-router-dom";
import CircleButton from "../CircleButton";

const PohonTable = ({data, onDelete, ...others}) => {
    const location = useLocation();

    const columns = [
        {
            title: "Nama", 
            path: "nama"
        },
        {
            title: "Alamat",
            path: "alamat",
        },
        {
            title: "Latitude",
            path: "lat"
        },
        {
            title: "Longitude",
            path: "lon"
        },
        {
            title: "Kecamatan",
            path: "kecamatan.nama"
        },
        {
            key: 'modifyButtons', 
            content: (pohonId) => (
                <>
                    <NavLink to={`${pohonId}`} state={{from: location.pathname}}>
                        <CircleButton btnClass={"btn-success"} iconClass={"mdi-grease-pencil"} />
                    </NavLink>
                    <CircleButton onClick={() => onDelete(pohonId)} btnClass={"btn-danger"} iconClass={"mdi-eraser-variant"} />
                </>
            )
        }
    ]

    const handleGetPageData = (searchQuery) => {
        if (searchQuery)
            return data.filter(pohon => (
                pohon.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                pohon.alamat.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                pohon.kecamatan.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(pohon.lat).toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(pohon.lon).toLowerCase().startsWith(searchQuery.toLowerCase()) 
            ));
        
        return data;
    }

    return (
        <Table
            columns={columns}
            onGetPageData={handleGetPageData}
            {...others}
        />
    );
}

export default PohonTable;