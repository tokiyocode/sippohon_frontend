import _ from "lodash";
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { deleteTPS, getAllTPS } from '../../services/tPSService';
import CircleButton from '../CircleButton';
import PageWithTable from "../pages/PageWithTable";

const TPSPage = () => {
    let [ allTPS, setAllTPS ] = useState([]);
    let [ showModal, setShowModal ] = useState(false);
    let [ selectedTPSId, setSelectedTPSId ] = useState("");
    let [ isLoading, setIsLoading ] = useState(true);
    const location = useLocation();

    useEffect(() => {
        getAllTPS()
            .then(({ data }) => {
                setAllTPS(data);
                setIsLoading(false);
            })
            .catch(({ message }) => alert(message));
    }, []);

    const handleOpenModal = (id) => {
        setShowModal(true);
        setSelectedTPSId(id);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleDelete = async () => {
        const backupData = allTPS;

        const filteredAllTPS = allTPS.filter(tps => tps._id !== selectedTPSId);
        setAllTPS(filteredAllTPS);

        try {
            await deleteTPS(selectedTPSId);
        } catch ({response}) {
            let message;
            if (response && response.status === 404)
                message = "Data tps telah dihapus dari database sebelumnya, silahkan refresh halaman";
            else
                message = "Gagal menghapus data TPS karena kesalahan server";

            alert(message);
            setAllTPS(backupData);
        }

        setShowModal(false);
    }

    const handleGetPageData = (query) => {
        if (query)
            return allTPS.filter(item => (
                item.alamat.toLowerCase().startsWith(query.toLowerCase()) ||
                item.kecamatan.nama.toLowerCase().startsWith(query.toLowerCase()) ||
                _.toString(item.lat).toLowerCase().startsWith(query.toLowerCase()) ||
                _.toString(item.lon).toLowerCase().startsWith(query.toLowerCase()) 
            ));
        
        return allTPS;
    }

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
                    <CircleButton onClick={() => handleOpenModal(id)} btnClass={"btn-danger"} iconClass={"mdi-eraser-variant"} />
                </>
            )
        }
    ];

    const columnsTablePrintTemplate = [];
    columns.map(column => {
        if (!column.key)
            columnsTablePrintTemplate.push(column);

    });

    return <PageWithTable 
                columns={columns}
                data={allTPS}
                isLoading={isLoading}
                printColumns={columnsTablePrintTemplate}
                showModal={showModal}
                title={"Tempat Pembuangan Sampah"} 
                onCloseModal={() => handleCloseModal()}
                onGetPageData={handleGetPageData}
                onSubmitModal={() => handleDelete()}
            />;
}
 
export default TPSPage;