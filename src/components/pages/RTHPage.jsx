import _ from "lodash";
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { deleteRTH, getAllRTH } from '../../services/ruangTerbukaHijauService';
import CircleButton from '../CircleButton';
import Table from '../tables/Table';
import PageWithTable from "./PageWithTable";


const RTHPage = () => {
    const [ allRTH, setAllRTH ] = useState([]);
    let [ showModal, setShowModal ] = useState(false);
    let [ selectedRTHId, setSelectedRTHId ] = useState("");
    let [ isLoading, setIsLoading ] = useState(true);
    const location = useLocation();

    useEffect(() => {
        getAllRTH()
            .then(({ data }) => {
                setAllRTH(data);
                setIsLoading(false)
            })
            .catch(({ message }) => alert(message))
    }, []);

    const handleDelete = async () => {
        const backupData = [...allRTH];

        const filteredAllRTH = allRTH.filter(rth => rth._id !== selectedRTHId);
        setAllRTH(filteredAllRTH);
        
        try {
            await deleteRTH(selectedRTHId);
        } catch ({response}) {
            let message = "";
            if (response && response.status === 404)
                message = "Data Ruang Terbuka Hijau telah dihapus oleh user lain, silahkan refresh halaman";
            else 
                message = "Gagal menghapus data karena kesalahan server";

            alert(message);
            setAllRTH(backupData);
        }

        setShowModal(false);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleOpenModal = (id) => {
        setShowModal(true);
        setSelectedRTHId(id);
    }

    const handleGetPageData = (searchQuery) => {
        if (searchQuery)
            return allRTH.filter(rth => (
                rth.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                rth.alamat.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                rth.kecamatan.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(rth.lat).toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(rth.lon).toLowerCase().startsWith(searchQuery.toLowerCase()) 
            ));
        
        return allRTH;
    }

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
                data={allRTH}
                isLoading={isLoading}
                printColumns={columnsTablePrintTemplate}
                showModal={showModal}
                title={"Ruang Terbuka Hijau"} 
                onCloseModal={() => handleCloseModal()}
                onGetPageData={handleGetPageData}
                onSubmitModal={() => handleDelete()}
            />;
}
 
export default RTHPage;