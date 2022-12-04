import _ from "lodash";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { deletePohon, getAllPohon } from "../../services/pohonService";
import CircleButton from "../CircleButton";
import PageWithTable from "./PageWithTable";

const PohonPage = () => {
    const [ allPohon, setAllPohon ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ selectedObjId, setSelectedObjId ] = useState("");
    const [ isLoading, setIsLoading ] = useState(true);
    const location = useLocation();

    useEffect(() => {
        getAllPohon()
            .then(({ data }) => {
                setAllPohon(data);
                setIsLoading(false);
            })
            .catch(error => alert(error.message));
    }, []);

    const handleGetPageData = (searchQuery) => {
        if (searchQuery)
            return allPohon.filter(pohon => (
                pohon.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                pohon.alamat.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                pohon.kecamatan.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(pohon.lat).toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                _.toString(pohon.lon).toLowerCase().startsWith(searchQuery.toLowerCase()) 
            ));
        
        return allPohon;
    }

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

    const columns = [
        {
            title: "Nama", 
            path: "nama"
        },
        {
            title: "Alamat",
            path: "alamat",
        },
        {
            title: "Latitude",
            path: "lat"
        },
        {
            title: "Longitude",
            path: "lon"
        },
        {
            title: "Kecamatan",
            path: "kecamatan.nama"
        },
        {
            key: 'modifyButtons', 
            content: (pohonId) => (
                <>
                    <NavLink to={`${pohonId}`} state={{from: location.pathname}}>
                        <CircleButton btnClass={"btn-success"} iconClass={"mdi-grease-pencil"} />
                    </NavLink>
                    <CircleButton onClick={() => handleOpenModal(pohonId)} btnClass={"btn-danger"} iconClass={"mdi-eraser-variant"} />
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
                data={allPohon}
                isLoading={isLoading}
                printColumns={columnsTablePrintTemplate}
                showModal={showModal}
                title={"Pohon"}
                onCloseModal={() => handleCloseModal()}
                onGetPageData={handleGetPageData}
                onSubmitModal={() => handleDelete()}
            />      
}

export default PohonPage;