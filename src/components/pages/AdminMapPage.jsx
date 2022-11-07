import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import Map from "../maps/Map";
import Sidebar from "../Sidebar";

class AdminMapPage extends Component {
    render() {
        return (
            <>
                <Sidebar />
                <div className="page-wrapper">
                    <div className="page-breadcrumb">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <Breadcrumb path={["Peta"]} />
                                <h1 className="mb-0 fw-bold">Peta</h1>
                            </div>
                            <div className="col-6">
                                <div className="text-end upgrade-btn">
                                    <NavLink to={"/"}>
                                        <button className="btn btn-success text-white">
                                            Layar Penuh
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card" style={{"height": "74vh"}}>
                                    <Map />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AdminMapPage;