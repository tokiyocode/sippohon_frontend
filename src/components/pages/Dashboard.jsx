import React from "react";
import { NavLink } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import MediaObject from "../MediaObject";
import Sidebar from "../Sidebar";
import TableDoughnutChart from "../charts/TableDoughnutChart";

const Dashboard = () => {
    return (
        <>
            <Sidebar />
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row align-items-center">
                        <div className="col-6">
                            <Breadcrumb path={["Dashboard"]} />
                            <h1 className="mb-0 fw-bold">Dashboard</h1> 
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-md-flex align-items-center">
                                        <div>
                                            <h4 className="card-title">Rangkuman Data</h4>
                                            <h6 className="card-subtitle">Chart Jumlah Data Pada Seluruh Tabel</h6>
                                        </div>
                                    </div>
                                    <div className="amp-pxl mt-5">
                                        <TableDoughnutChart width={600} height={600} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Tabel</h4>
                                    <h6 className="card-subtitle">Klik untuk edit data</h6>
                                    <NavLink to={"/pohon"}>
                                        <MediaObject title={"Pohon"} btnClass={"btn-success"} btnIconClass={"mdi mdi-tree"} />
                                    </NavLink>
                                    <NavLink to={"/bankSampah"}>
                                        <MediaObject title={"Bank Sampah"} btnClass={"btn-warning"} btnIconClass={"mdi mdi-bank"} />
                                    </NavLink>
                                    <NavLink to={"/tempatPembuanganSampah"}>
                                        <MediaObject title={"Tempat Pembuangan Sampah"} btnClass={"btn-danger"} btnIconClass={"mdi mdi-delete"} />
                                    </NavLink>
                                    <NavLink to={"/tempatPembuanganAkhir"}>
                                        <MediaObject title={"Tempat Pembuangan Akhir"} btnClass={"btn-info"} btnIconClass={"mdi mdi-delete-forever"} />
                                    </NavLink>
                                    <NavLink to={"/ruangTerbukaHijau"}>
                                        <MediaObject title={"Ruang Terbuka Hijau"} btnClass={"btn-primary"} btnIconClass={"mdi mdi-ungroup"} />
                                    </NavLink>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    }

export default Dashboard;