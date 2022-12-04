import Joi from "joi";
import React from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getAllKecamatan } from "../../services/kecamatanService";
import { getRTH, saveRTH } from "../../services/ruangTerbukaHijauService";
import Breadcrumb from "../Breadcrumb";
import Sidebar from "../Sidebar";
import Form from "./Form";

class RTHForm extends Form {
    state = { 
        data: {
            nama: "",
            alamat: "",
            lats: [],
            lons: [],
            kecamatanId: ""
        },
        errors: {},
        kecamatan: [],
        latInputs: [{id: uuidv4()}],
        lonInputs: [{id: uuidv4()}]
    };

    async componentDidMount() {
        const {data: kecamatan} = await getAllKecamatan();
        this.setState({ kecamatan });

        const {params, navigate} = this.props;
        if (params._id === "new")
            return;
            
        try {
            const {data: rth} = await getRTH(params._id);
            let {latInputs, lonInputs} = this.state;
            latInputs = this.populateMultipleInputs(rth.lats, latInputs);
            lonInputs = this.populateMultipleInputs(rth.lons, lonInputs);
            this.setState({ data: this.mapToViewModel(rth), latInputs, lonInputs});
        } catch (error) {
            return navigate("not-found", {replace: true});
        }
    }

    mapToViewModel = (rth) => {
        return {
            _id: rth._id,
            nama: rth.nama,
            alamat: rth.alamat,
            lats: rth.lats,
            lons: rth.lons,
            kecamatanId: rth.kecamatan._id
        };
    }

    populateMultipleInputs = (data, inputsContainer) => {
        let index = 0;
        return data.map(item => inputsContainer[index++] = {id: uuidv4(), value: item});
    }

    longitudesCustomValidator = (value, helpers) => {
        const {data} = this.state;
        if (data.lats.length !== value.length)
            return helpers.message("Jumlah latitudes dan longitudes harus sama");
        
        return value;
    }

    schema = {
        _id: Joi.string(),
        nama: Joi.string().min(3).max(255).required().messages({
            "string.empty": "nama tidak boleh kosong",
            "string.min": "nama setidaknya memiliki panjang 3 character",
            "string.max": "nama tidak boleh memiliki panjang lebih dari 255 character"
        }),
        alamat: Joi.string().min(3).required().messages({
            "string.empty": "alamat tidak boleh kosong",
            "string.min": "alamat setidaknya memiliki panjang 3 character"
        }),
        lats: Joi.array().items(
            Joi.number().required().messages({ "number.unsafe": "angka yang dimasukkan tidak valid sebagai latitudes"})
            ).required().messages({
            "array.includesRequiredUnknowns": "latitudes tidak boleh kosong"
        }),
        lons: Joi.array().items(
                Joi.number().required().messages({ "number.unsafe": "angka yang dimasukkan tidak valid sebagai longitudes"})
            ).required().messages({
            "array.includesRequiredUnknowns": "longitudes tidak boleh kosong"
        }),
        kecamatanId: Joi.string().required().messages({
            "string.empty": "kecamatan tidak boleh kosong"
        })
    };

    // I decided to create this function because the validation logic cannot be achieved using current version of joi
    latsLongsCustomValidation = () => {
        const {data} = this.state;

        const errors = {};
        if (data.lats.length !== data.lons.length) {
            const errorMessage = "Jumlah latitudes dan longitudes harus sama";
            errors.lats = errorMessage;
            errors.lons = errorMessage;
            return errors;
        }

        return null;
    }

    isUpdateForm(id) {
        return this.props.params._id === id;
    }

    getTypeOfForm() {
        const { data } = this.state;
        if (data._id)
            return "Form Update";

        return "Form Create";
    }

    redirect() {
        const { location, navigate } = this.props;
        let url = "/ruangTerbukaHijau";
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
        const {data, errors} = this.state;

        const latsLongsErrors = this.latsLongsCustomValidation();
        if (latsLongsErrors) {
            this.setState({errors: latsLongsErrors})
            return;
        }

        if (data.lats.length !== data.lons.length) {
            const errorMessage = "Jumlah latitudes dan longitudes harus sama";
            errors.lats = errorMessage;
            errors.lons = errorMessage;
            this.setState({errors});
            return;
        }

        await saveRTH(data);

        this.redirect();
    }

    render() {
        const {data, kecamatan} = this.state;

        return (
            <>
                <Sidebar />
                <div className="page-wrapper">
                    <div className="page-breadcrumb">
                        <div className="row-align-item-center">
                            <div className="col-16">
                                <Breadcrumb path={["Form", "Ruang Terbuka Hijau"]} />
                                <h1 className="mb-0 fw-bold">Ruang Terbuka Hijau</h1>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form onSubmit={(e) => this.handleSubmit(e)} autoComplete={"off"}>
                                            {this.renderInput("nama", "Nama", "text", true)}
                                            {this.renderTextArea("alamat", "Alamat")}
                                            {this.renderMultipleInputs("lats", "Latitudes", "latInputs", "number")}
                                            {this.renderMultipleInputs("lons", "Longitudes", "lonInputs", "number")}
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
                        location={useLocation()} />;
    }
}

export default WithHooks(RTHForm);