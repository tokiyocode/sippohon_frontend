import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import CircleButton from "../CircleButton";
import Table from "./Table";

const AdminTable = ({data, onDelete, ...others}) => {
    const location = useLocation();
    
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
                    <CircleButton onClick={() => onDelete(adminId)} btnClass={"btn-danger"} iconClass={"mdi-eraser-variant"} />
                </>
            )
        }
    ];

    const handleGetPageData = (searchQuery) => {
        if (searchQuery)
            return data.filter(admin => (
                admin.nama.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                admin.username.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                admin.role.label.toLowerCase().startsWith(searchQuery.toLowerCase())
            ));

        return data;
    }

    return <Table columns={columns} onGetPageData={handleGetPageData} {...others} />
}

export default AdminTable;