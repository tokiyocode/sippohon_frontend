import React, { useEffect, useState } from "react";
import { deletePohon, getAllPohon } from "../../services/pohonService";
import PageWithTable from "./PageWithTable";
import PohonTable from "../tables/PohonTable";

const PohonPage = () => {
    const [ allPohon, setAllPohon ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ selectedObjId, setSelectedObjId ] = useState("");
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        getAllPohon()
            .then(({ data }) => {
                setAllPohon(data);
                setIsLoading(false);
            })
            .catch(error => alert(error.message));
    }, []);

    const handleDelete = async () => {
        const backupData = allPohon;

        const filteredData = allPohon.filter(pohon => pohon._id !== selectedObjId);
        setAllPohon(filteredData);
        setShowModal(false);

        try {
            await deletePohon(selectedObjId);
        }
        catch (err) {
            let message;
            if (err.response && err.response.status === 404)
                message = "Data telah dihapus sebelumnya, silahkan refresh halaman";
            else 
                message = "Gagal menghapus data karena kesalahan server";

            alert(message);
            
            setAllPohon(backupData);
        }

    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleOpenModal = (id) => {
        setShowModal(true);
        setSelectedObjId(id);
    }

    return <PageWithTable 
                title={"Pohon"} 
                Table={
                    <PohonTable 
                        data={allPohon}
                        onDelete={handleOpenModal}
                        isLoading={isLoading} />
                }
                showModal={showModal}
                onCloseModal={() => handleCloseModal()}
                onSubmitModal={() => handleDelete()}
            />      
}

export default PohonPage;