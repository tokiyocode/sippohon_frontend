import _ from "lodash";
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { deleteTPA, getAllTPA } from '../../services/tPAService';
import CircleButton from '../CircleButton';
import PageWithTable from "../pages/PageWithTable";

const TPAPage = () => {
    let [ allTPA, setAllTPA ] = useState([]);;
    let [ showModal, setShowModal ] = useState(false);
    let [ selectedTPAId, setSelectedTPAId ] = useState("");
    let [ isLoading, setIsLoading ] = useState(true);
    const location = useLocation();

    useEffect(() => {
        getAllTPA()
            .then(({ data }) => {
                setAllTPA(data);
                setIsLoading(false);
            })
            .catch(({ message }) => alert(message));

    }, []);

    const handleDelete = async () => {
        const backupData = allTPA;
        
        const filteredAllTPA = allTPA.filter(tpa => tpa._id !== selectedTPAId);
        setAllTPA(filteredAllTPA);

        try {
            await deleteTPA(selectedTPAId);
        } catch ({response}) {
            let message;
            if (response && response.status === 404)
                message = "Data TPA yang dipilih telah dihapus sebelumnya, silahkan refresh halaman";
            else
                message = "Gagal menghapus data TPA yang dipilih karena kesalahan server"

            alert(message);
            setAllTPA(backupData);
        }

        setShowModal(false);
    }

    const handleOpenModal = (id) => {
        setShowModal(true);
        setSelectedTPAId(id);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleGetPageData = (searchQuery) => {
        if (searchQuery) 
            return allTPA.filter(tpa => (
                tpa.alamat.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                tpa.kecamatan.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(tpa.lat).toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(tpa.lon).toLowerCase().startsWith(searchQuery.toLowerCase()) 
            ));

        return allTPA;
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
                    <NavLink to={id} state={{from: location.pathname}} >
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
                data={allTPA}
                isLoading={isLoading}
                printColumns={columnsTablePrintTemplate}
                showModal={showModal}
                title={"Tempat Pembuangan Akhir"}
                onCloseModal={() => handleCloseModal()}
                onGetPageData={handleGetPageData}
                onSubmitModal={() => handleDelete()}
            />;
}
 
export default TPAPage;