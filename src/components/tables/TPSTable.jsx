import _ from 'lodash';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import CircleButton from '../CircleButton';
import Table from "./Table";

const TPSTable = ({ data, onDelete, ...others }) => {
    const location = useLocation();
    const columns = [
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
        {
            key: 'modifyButtons', 
            content: (id) => (
                <>
                    <NavLink to={`${id}`} state={{from: location.pathname}} >
                        <CircleButton btnClass={"btn-success"} iconClass={"mdi-grease-pencil"} />
                    </NavLink>
                    <CircleButton onClick={() => onDelete(id)} btnClass={"btn-danger"} iconClass={"mdi-eraser-variant"} />
                </>
            )
        }
    ];

    const handleGetPageData = (query) => {
        if (query)
            return data.filter(item => (
                item.alamat.toLowerCase().startsWith(query.toLowerCase()) ||
                item.kecamatan.nama.toLowerCase().startsWith(query.toLowerCase()) ||
                _.toString(item.lat).toLowerCase().startsWith(query.toLowerCase()) ||
                _.toString(item.lon).toLowerCase().startsWith(query.toLowerCase()) 
            ));
        
        return data;
    }
    
    return <Table columns={columns} onGetPageData={handleGetPageData} {...others} />;
}
 
export default TPSTable;