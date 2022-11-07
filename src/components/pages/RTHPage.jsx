import React, { useState } from 'react';
import { useEffect } from 'react';
import { deleteRTH, getAllRTH } from '../../services/ruangTerbukaHijauService';
import RTHTable from '../tables/RTHTable';
import PageWithTable from "./PageWithTable";


const RTHPage = () => {
    const [ allRTH, setAllRTH ] = useState([]);
    let [ showModal, setShowModal ] = useState(false);
    let [ selectedRTHId, setSelectedRTHId ] = useState("");
    let [ isLoading, setIsLoading ] = useState(true);

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

    return <PageWithTable 
                title={"Ruang Terbuka Hijau"} 
                showModal={showModal}
                onCloseModal={() => handleCloseModal()}
                onSubmitModal={() => handleDelete()}
                Table={<RTHTable data={allRTH} onDelete={handleOpenModal} isLoading={isLoading} />}
            />;
}
 
export default RTHPage;