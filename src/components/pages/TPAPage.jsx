import React, { useEffect, useState } from 'react';
import { getAllTPA, deleteTPA } from '../../services/tPAService';
import PageWithTable from "../pages/PageWithTable";
import TPATable from '../tables/TPATable';

const TPAPage = () => {
    let [ allTPA, setAllTPA ] = useState([]);;
    let [ showModal, setShowModal ] = useState(false);
    let [ selectedTPAId, setSelectedTPAId ] = useState("");
    let [ isLoading, setIsLoading ] = useState(true);

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


    return <PageWithTable 
                title={"Tempat Pembuangan Akhir"}
                showModal={showModal}
                onCloseModal={() => handleCloseModal()}
                onSubmitModal={() => handleDelete()}
                Table={<TPATable data={allTPA} onDelete={handleOpenModal} isLoading={isLoading} />}
            />;
}
 
export default TPAPage;