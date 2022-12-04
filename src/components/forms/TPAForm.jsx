import Joi from "joi";
import React from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllKecamatan } from "../../services/kecamatanService";
import { getTPA, saveTPA } from "../../services/tPAService";
import Breadcrumb from "../Breadcrumb";
import Sidebar from "../Sidebar";
import Form from "./Form";

class TPAForm extends Form {
    state = {
        data: {
            lat: "",
            lon: "",
            alamat: "",
            kecamatanId: ""
        },
        errors: {},
        kecamatan: []
    };

    schema = {
        _id: Joi.string(),
        lat: Joi.number().required().messages({
            "number.base": "latitude tidak boleh kosong"
        }),
        lon: Joi.number().required().messages({
            "number.base": "longitude tidak boleh kosong"
        }),
        alamat: Joi.string().min(3).required().messages({
            "string.empty": "alamat tidak boleh kosong",
            "string.min": "alamat setidaknya memiliki panjang 3 character"
        }),
        kecamatanId: Joi.string().required().messages({
            "string.empty": "kecamatan tidak boleh kosong"
        })
    }

    async componentDidMount() {
        const {data: kecamatan} = await getAllKecamatan();
        this.setState({ kecamatan });

        const {params, navigate} = this.props;
        if (params._id === "new")
            return;

        try {
            const {data: tpa} = await getTPA(params._id);
            this.setState({data: this.mapToViewModel(tpa)});
        } catch {
            return navigate("/not-found", {replace: true});
        }
    }

    mapToViewModel = (tpa) => {
        return {
            _id: tpa._id,
            lat: tpa.lat,
            lon: tpa.lon,
            alamat: tpa.alamat,
            kecamatanId: tpa.kecamatan._id
        };
    }

    getTypeOfForm() {
        const { data } = this.state;
        if (data._id)
            return "Form Update";

        return "Form Create";
    }

    redirect() {
        const { location, navigate } = this.props;
        let url = "/tempatPembuanganAkhir";
        const { state } = location;
        if (state && state.from)
            url = state.from;

        return navigate(url, {
            replace: true,
            state: {
                formType: this.getTypeOfForm()
            }
        });
    }

    async doSubmit() {
        await saveTPA(this.state.data);

        this.redirect();
    }

    render() {
        const {data, kecamatan} = this.state;

        return (
            <>
                <Sidebar />
                <div className="page-wrapper">
                    <div className="page-breadcrumb">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <Breadcrumb path={["Form", "Tempat Pembuangan Akhir"]} />
                                <h1 className="mb-0 fw-bold">Tempat Pembuangan Akhir</h1>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">
                                            {this.renderInput("lat", "Latitude", "number", true)}
                                            {this.renderInput("lon", "Longitude", "number")}
                                            {this.renderTextArea("alamat", "Alamat")}
                                            {this.renderSelection("kecamatanId", "Kecamatan", kecamatan, "_id", "nama", data["kecamatanId"])}
                                            {this.renderPrimaryButton("Simpan")}
                                            <div className="form-group btn">
                                                <div className="col-sm-12 mt-4">
                                                    <NavLink className="btn btn-danger text-white" to={-1} replace={true}>Kembali</NavLink>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

function WithHooks(Component) {
    return function WrappedComponent(props) {
        return <Component
                    {...props}
                    params={useParams()}
                    navigate={useNavigate()}
                    location={useLocation()}
                />
    }
}

export default WithHooks(TPAForm);