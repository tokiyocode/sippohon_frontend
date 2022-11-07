import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../Breadcrumb";
import Modal from "../Modal";
import Sidebar from "../Sidebar";

const PageWithTable = ({ 
    title, 
    Table, 
    onCloseModal, 
    onSubmitModal, 
    showModal=false
}) => {
    const location = useLocation();

    useEffect(() => {
        const { state } = location;
        if (state)
            showNotification(state);
    }, []);

    const preventNotificationWhenReload = () => {
        window.history.replaceState({}, "");
    }

    const showNotification = (state) => {
        const {formType} = state;
        let message;
        if (formType === "Form Create")
            message = "Berhasil menambah data";
        else if (formType === "Form Update")
            message = "Data berhasil di update";

        toast.success(message, {
            position: "top-left"
        });

        delete location.state;
        preventNotificationWhenReload();
    }

    return (
        <>
            {showModal && 
            <Modal
                title={"Yakin ingin hapus data?"}
                body={"Data yang telah dihapus tidak dapat dikembalikan"}
                btnCancelLabel={"Batal"}
                btnSubmitLabel={"Hapus"}
                onClose={onCloseModal}
                onSubmit={onSubmitModal}
            />}
            <Sidebar />
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row align-items-center">
                        <div className="col-6">
                            <Breadcrumb path={["Tabel", title]} />
                            <h1 className="mb-0 fw-bold">{title}</h1>
                        </div>
                        <div className="col-6">
                            <div className="text-end upgrade-btn">
                                <NavLink to={"new"} state={{from: location.pathname}}>
                                    <button className="btn btn-primary text-white"
                                        target="_blank">Tambah Data</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {Table} 
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default PageWithTable;