import _ from 'lodash';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import CircleButton from '../CircleButton';
import Table from './Table';


const TPATable = ({ data, onDelete, ...others }) => {
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
                    <NavLink to={id} state={{from: location.pathname}} >
                        <CircleButton btnClass={"btn-success"} iconClass={"mdi-grease-pencil"} />
                    </NavLink>
                    <CircleButton onClick={() => onDelete(id)} btnClass={"btn-danger"} iconClass={"mdi-eraser-variant"} />
                </>
            )
        }
    ];

    const handleGetPageData = (searchQuery) => {
        if (searchQuery) 
            return data.filter(tpa => (
                tpa.alamat.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                tpa.kecamatan.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(tpa.lat).toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(tpa.lon).toLowerCase().startsWith(searchQuery.toLowerCase()) 
            ));

        return data;
    }

    return <Table columns={columns} onGetPageData={handleGetPageData} {...others} />;
}
 
export default TPATable;