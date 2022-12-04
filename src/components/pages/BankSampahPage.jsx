import _ from "lodash";
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { deleteBankSampah, getAllBankSampah } from '../../services/bankSampahService';
import CircleButton from '../CircleButton';
import PageWithTable from './PageWithTable';

const BankSampahPage = () => {
    let [ allBankSampah, setAllBankSampah ] = useState([]);
    let [ showModal, setShowModal ] = useState(false);
    let [ selectedBankSampahId, setSelectedBankSampahId ] = useState("");
    let [ isLoading, setIsLoading ] = useState(true);
    const location = useLocation();

    const handleGetPageData = (searchQuery) => {
        if (searchQuery)
            return allBankSampah.filter(bankSampah => (
                bankSampah.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                bankSampah.alamat.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                bankSampah.kecamatan.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(bankSampah.lat).toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(bankSampah.lon).toLowerCase().startsWith(searchQuery.toLowerCase()) 
            ));
        
        return allBankSampah;
    }

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
        {key: 'modifyButtons', content: (id) => (
            <>
                <NavLink to={`${id}`} state={{from: location.pathname}} >
                    <CircleButton btnClass={"btn-success"} iconClass={"mdi-grease-pencil"} />
                </NavLink>
                <CircleButton onClick={() => handleOpenModal(id)} btnClass={"btn-danger"} iconClass={"mdi-eraser-variant"} />
            </>
        )}
    ];

    const columnsTablePrintTemplate = [];
    columns.map(column => {
        if (!column.key)
            columnsTablePrintTemplate.push(column);

    });

    return <PageWithTable 
                columns={columns}
                data={allBankSampah}
                isLoading={isLoading}
                printColumns={columnsTablePrintTemplate}
                showModal={showModal}
                title={"Bank Sampah"}
                onSubmitModal={() => handleDelete()}
                onCloseModal={() => handleCloseModal()}
                onGetPageData={handleGetPageData}
            />;
}


export default BankSampahPage;