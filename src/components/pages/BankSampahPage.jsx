import React, { useState, useEffect } from 'react'
import PageWithTable from './PageWithTable';
import BankSampahTable from '../tables/BankSampahTable';
import { deleteBankSampah, getAllBankSampah } from '../../services/bankSampahService';

const BankSampahPage = () => {
    let [ allBankSampah, setAllBankSampah ] = useState([]);
    let [ showModal, setShowModal ] = useState(false);
    let [ selectedBankSampahId, setSelectedBankSampahId ] = useState("");
    let [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        getAllBankSampah()
            .then(({ data }) => {
                setAllBankSampah(data);
                setIsLoading(false);
            })
            .catch(({ message }) => alert(message));
    }, []); 

    const handleDelete = async () => {
        const backupData = allBankSampah;

        const filteredAllBankSampah = allBankSampah.filter(bankSampah => bankSampah._id !== selectedBankSampahId);
        setAllBankSampah(filteredAllBankSampah);

        try {
            await deleteBankSampah(selectedBankSampahId);
        }
        catch ({response}){
            let message;
            if (response && response.status === 404)
                message = "Data telah dihapus di database, silahkan refresh halaman";
            
            message = "Gagal menghapus data karena kesalahan server";

            alert(message);
            setAllBankSampah(backupData);
        }

        setShowModal(false);
    }

    const handleOpenModal = (id) => {
        setShowModal(true);
        setSelectedBankSampahId(id);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return <PageWithTable 
                title={"Bank Sampah"}
                Table={<BankSampahTable data={allBankSampah} onDelete={handleOpenModal} isLoading={isLoading} />}
                onSubmitModal={() => handleDelete()}
                onCloseModal={() => handleCloseModal()}
                showModal={showModal}
            />;
}


export default BankSampahPage;