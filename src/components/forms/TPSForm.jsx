import Joi from "joi";
import React from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllKecamatan } from "../../services/kecamatanService";
import { getTPS, saveTPS } from "../../services/tPSService";
import Breadcrumb from "../Breadcrumb";
import Sidebar from "../Sidebar";
import Form from "./Form";

class TPSForm extends Form {
    state = {
        data: {
            alamat: "",
            lat: "",
            lon: "",
            kecamatanId: "",
            foto: ""
        },
        errors: {},
        kecamatan: []
    };

    schema = {
        _id: Joi.string(),
        alamat: Joi.string().min(3).required().messages({
            "string.empty": "alamat tidak boleh kosong",
            "string.min": "alamat setidaknya memiliki panjang 3 character"
        }),
        lat: Joi.number().required().messages({
            "number.base": "Latitude tidak boleh kosong"
        }),
        lon: Joi.number().required().messages({
            "number.base": "Longitude tidak boleh kosong"
        }),
        kecamatanId: Joi.string().required().messages({
            "string.empty": "kecamatan tidak boleh kosong"
        }),
        foto: Joi.object()
    };

    async componentDidMount() {
        const {data: kecamatan} = await getAllKecamatan();
        this.setState({ kecamatan });

        const {params, navigate} = this.props;
        if (params._id === "new")
            return;

        try {
            const {data: tps} = await getTPS(params._id);
            this.setState({data: this.mapToViewModel(tps)});
        } catch {
            return navigate("/not-found", {replace: true});
        }
    }

    mapToViewModel = (tps) => {
        return {
            _id: tps._id,
            alamat: tps.alamat,
            lat: tps.lat,
            lon: tps.lon,
            kecamatanId: tps.kecamatan._id
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
        let url = "/tempatPembuanganSampah";
        const { state } = location;
        if (state && state.from)
            url = location.state.from;

        return navigate(url, {
            replace: true,
            state: {
                formType: this.getTypeOfForm()
            }
        })
    }

    doSubmit = async () => {
        await saveTPS(this.state.data);

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
                                <Breadcrumb path={["Form", "Tempat Pembuangan Sampah"]} />
                                <h1 className="mb-0 fw-bold">
                                    Tempat Pembuangan Sampah
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form 
                                            onSubmit={(e) => this.handleSubmit(e)} 
                                            autoComplete="off"
                                            encType="multipart/form-data"
                                        >
                                            {this.renderInput("lat", "Latitude", "number", true)}
                                            {this.renderInput("lon", "Longitude", "number")}
                                            {this.renderTextArea("alamat", "Alamat")}
                                            {this.renderSelection("kecamatanId", "Kecamatan", kecamatan, "_id", "nama", data["kecamatanId"])}
                                            {this.renderFileInput("foto", "Foto (Landscape)")}
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

export default WithHooks(TPSForm);