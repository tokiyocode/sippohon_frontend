import Joi from "joi";
import React from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { getBankSampah, saveBankSampah } from "../../services/bankSampahService";
import { getAllKecamatan } from "../../services/kecamatanService";
import Breadcrumb from "../Breadcrumb";
import Form from "./Form";
import Sidebar from "../Sidebar";

class BankSampahForm extends Form {
    state = {
        data: {
            nama: "",
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
        nama: Joi.string().min(3).max(255).required().messages({
            "string.empty": "nama tidak boleh kosong",
            "string.min": "nama setidaknya memiliki panjang 3 character",
            "string.max": "nama tidak boleh lebih dari 255 character"
        }),
        alamat: Joi.string().min(3).required().messages({
            "string.empty": "alamat tidak boleh kosong",
            "string.min": "alamat setidaknya memiliki pangjang 3 character"
        }),
        lat: Joi.number().required().messages({
            "number.base": "latitude tidak boleh kosong"
        }),
        lon: Joi.number().required().messages({
            "number.base": "longitude tidak boleh kosong"
        }),
        kecamatanId: Joi.string().required().messages({
            "string.empty": "kecamatan tidak boleh kosong"
        }),
        foto: Joi.object()
    };

    async componentDidMount() {
        const {data: kecamatan} = await getAllKecamatan();
        this.setState({kecamatan});

        const {params, navigate} = this.props;
        if (params._id === "new")
            return;

        try {
            const {data: bankSampah} = await getBankSampah(params._id);
            this.setState({ data: this.mapToViewModel(bankSampah)});
        } catch (error) {
            return navigate("/not-found", {replace: true});
        }
    }

    mapToViewModel = (bankSampah) => {
        return {
            _id: bankSampah._id,
            nama: bankSampah.nama,
            alamat: bankSampah.alamat,
            lat: bankSampah.lat,
            lon: bankSampah.lon,
            kecamatanId: bankSampah.kecamatan._id
        };
    }

    getFormType() {
        const { data } = this.state;
        if (data._id)
            return "Form Update";

        return "Form Create";
    }

    redirect() {
        const { location, navigate } = this.props;
        let url = "/bankSampah";
        const { state } = location;
        if (state && state.from)
            url = state.from;
        
        return navigate(url, {
            replace: true,
            state: {
                formType: this.getFormType()
            }
        });
    }

    async doSubmit() {
        await saveBankSampah(this.state.data);

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
                            <Breadcrumb path={["Form", "Bank Sampah"]} />
                            <h1 className="mb-0 fw-bold">Bank Sampah</h1>
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
                                            {this.renderInput("nama", "Nama", "text", true)}
                                            {this.renderTextArea("alamat", "Alamat")}
                                            {this.renderInput("lat", "Latitude", "number")}
                                            {this.renderInput("lon", "Longitude", "number")}
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
                    navigate={useNavigate()}
                    params={useParams()} 
                    location={useLocation()}
                />;
    }
}

export default WithHooks(BankSampahForm);

