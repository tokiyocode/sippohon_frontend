import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { deleteUser, getUsers } from "../../services/userService";
import CircleButton from "../CircleButton";
import PageWithTable from "./PageWithTable";

const AdminPage = () => {
    const [ admins, setAdmins ] = useState("");
    const [ showModal, setShowModal ] = useState(false);
    const [ selectedAdminId, setSelectedAdminId ] = useState("");
    const [ isLoading, setIsLoading ] = useState(true);
    const location = useLocation();

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

    const handleGetPageData = (searchQuery) => {
        if (searchQuery)
            return admins.filter(admin => (
                admin.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                admin.username.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                admin.role.label.toLowerCase().startsWith(searchQuery.toLowerCase())
            ));

        return admins;
    }

    const columns = [
        {
            title: "Nama",
            path: "nama"   
        },
        {
            title: "Username",
            path: "username"
        },
        {
            title: "Role",
            path: "role.label"
        },
        {
            key: 'modifyButtons', 
            content: (adminId) => (
                <>
                    <NavLink to={`${adminId}`} state={{from: location.pathname}} >
                        <CircleButton btnClass={"btn-success"} iconClass={"mdi-grease-pencil"} />
                    </NavLink>
                    <CircleButton onClick={() => handleOpenModal(adminId)} btnClass={"btn-danger"} iconClass={"mdi-eraser-variant"} />
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
                data={admins}
                isLoading={isLoading}
                printColumns={columnsTablePrintTemplate}
                showModal={showModal}
                title={"Admin"} 
                onCloseModal={() => handleCloseModal()}
                onGetPageData={handleGetPageData}
                onSubmitModal={() => handleDelete()}
            />;
}

export default AdminPage;