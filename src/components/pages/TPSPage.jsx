import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { deleteTPS, getAllTPS } from '../../services/tPSService';
import PageWithTable from "../pages/PageWithTable";
import TPSTable from '../tables/TPSTable';

const TPSPage = () => {
    let [ allTPS, setAllTPS ] = useState([]);
    let [ showModal, setShowModal ] = useState(false);
    let [ selectedTPSId, setSelectedTPSId ] = useState("");
    let [ isLoading, setIsLoading ] = useState(true);

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

    return <PageWithTable 
                title={"Tempat Pembuangan Sampah"} 
                Table={<TPSTable data={allTPS} onDelete={handleOpenModal} isLoading={isLoading} />}
                showModal={showModal}
                onCloseModal={() => handleCloseModal()}
                onSubmitModal={() => handleDelete()}
            />;
}
 
export default TPSPage;