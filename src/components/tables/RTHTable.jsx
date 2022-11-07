import _ from 'lodash';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import CircleButton from '../CircleButton';
import Table from "./Table";

const RTHTable = ({ data, onDelete, ...others }) => {
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
            title: 'Kecamatan',
            path: 'kecamatan.nama'
        },
        {
            key: 'modifyButtons', 
            content: (id) => (
                <>
                    <NavLink to={id} state={{from: location.pathname}}>
                        <CircleButton btnClass={"btn-success"} iconClass={"mdi-grease-pencil"} />
                    </NavLink>
                    <CircleButton onClick={() => onDelete(id)} btnClass={"btn-danger"} iconClass={"mdi-eraser-variant"} />
                </>
            )
        }
    ];

    const handleGetPageData = (searchQuery) => {
        if (searchQuery)
            return data.filter(rth => (
                rth.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                rth.alamat.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                rth.kecamatan.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(rth.lat).toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(rth.lon).toLowerCase().startsWith(searchQuery.toLowerCase()) 
            ));
        
        return data;
    }

    return <Table columns={columns} onGetPageData={handleGetPageData} {...others} />;
}
 
export default RTHTable;