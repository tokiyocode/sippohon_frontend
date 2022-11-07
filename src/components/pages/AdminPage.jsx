import React, { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../services/userService";
import AdminTable from "../tables/AdminTable";
import PageWithTable from "./PageWithTable";

const AdminPage = () => {
    const [ admins, setAdmins ] = useState("");
    const [ showModal, setShowModal ] = useState(false);
    const [ selectedAdminId, setSelectedAdminId ] = useState("");
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        getUsers()
            .then(({ data }) => {
                setAdmins(data);
                setIsLoading(false);
            })
            .catch(({message}) => alert(message));
    }, []);

    const handleDelete = async () => {
        const backupData = admins;

        const filteredAdmins = admins.filter(user => user._id !== selectedAdminId);
        setAdmins(filteredAdmins);

        try {
            await deleteUser(selectedAdminId);
        } catch ({response}) {
            let message;
            if (response && response.status === 404)
                message = "Data yang dipilih sudah dihapus oleh user lain, silahkan refresh halaman ini!";
            else
                message = "Gagal menghapus data karena kesalahan server";

            alert(message);
            setAdmins(backupData);
        }

        setShowModal(false);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleOpenModal = (id) => {
        setShowModal(true);
        setSelectedAdminId(id);
    }

    return <PageWithTable 
                title={"Admin"} 
                Table={
                    <AdminTable 
                        data={admins}
                        onDelete={handleOpenModal}
                        isLoading={isLoading} />
                }
                showModal={showModal}
                onCloseModal={() => handleCloseModal()}
                onSubmitModal={() => handleDelete()}
            />;
}

export default AdminPage;