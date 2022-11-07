import React, {Component} from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Map from "../maps/Map";
import ModalLoginForm from "../forms/ModalLoginForm";

const FullMapPage = () =>  {
    const [ showLoginModal, setShowModal ] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/login")
            setShowModal(true);
    });

    return (
        <>
            <div className="full-map-container">
                {showLoginModal && <ModalLoginForm />}
                <Map />
            </div>
        </>
    );
}

export default FullMapPage;