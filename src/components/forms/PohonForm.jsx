import Joi from "joi";
import moment from "moment";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllKecamatan } from "../../services/kecamatanService";
import { getPohon, savePohon } from "../../services/pohonService";
import Breadcrumb from "../Breadcrumb";
import Sidebar from "../Sidebar";
import Form from "./Form";

class PohonForm extends Form {
    state = {
        data: {
            nama: "",
            lat: "",
            lon: "",
            umur: 0,
            tinggi: 0,
            terakhirPerawatan: "",
            alamat: "",
            kecamatanId: ""
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
        umur: Joi.number().messages({
            "number.base": "beri value 0 jika ingin mengkosongkan umur"
        }),
        tinggi: Joi.number().messages({
            "number.base": "beri value 0 jika ingin mengkosongkan tinggi"
        }),
        terakhirPerawatan: Joi.date(),
        kecamatanId: Joi.string().required().messages({
            "string.empty": "kecamatan tidak boleh kosong"
        }),
        foto: Joi.object()
    }

    async componentDidMount() { 
        const {data: kecamatan} = await getAllKecamatan();
        this.setState({ kecamatan });

        const {params} = this.props;
        if (params._id === "new")
            return;

        try {
            const {data: pohon} = await getPohon(params._id);
            this.setState({data: this.mapToViewModel(pohon)});
        }
        catch {
            return this.props.navigate('/not-found', {replace: true});
        }
    }

    mapToViewModel = (pohon) => {
        return {
            _id: pohon._id,
            nama: pohon.nama,
            lat: pohon.lat,
            lon: pohon.lon,
            umur: pohon.umur,
            tinggi: pohon.tinggi,
            terakhirPerawatan: moment(new Date(pohon.terakhirPerawatan)).format("YYYY-MM-DD"),
            alamat: pohon.alamat,
            kecamatanId: pohon.kecamatan._id
        }
    }

    getTypeOfForm = () => {
        const {data} = this.state;
        if (data._id)
            return "Form Update";

        return "Form Create";
    }

    redirect() {
        const { navigate, location } = this.props;
        let url = "/pohon";
        const { state } = location;
        if (state && state.from)
            url = state.from;

        return navigate(url, {replace: true, state: {formType: this.getTypeOfForm()}});
    }

    doSubmit = async () => {
        await savePohon(this.state.data);

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
                            <div className='col-6'>
                                <Breadcrumb path={["Form", "Pohon"]} />
                                <h1 className="mb-0 fw-bold">Pohon</h1>
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
                                            className="form-horizontal form-material mx-2" 
                                            encType="multipart/form-data"
                                        >
                                            {this.renderInput("nama", "Nama")}
                                            {this.renderInput("lat", "Latitude", "number")}
                                            {this.renderInput("lon", "Longitude", "number")}
                                            {this.renderInput("umur", "Umur", "number")}
                                            {this.renderInput("tinggi", "Tinggi (cm)", "number")}
                                            {this.renderInput("terakhirPerawatan", "Terakhir Perawatan", "date")}
                                            {this.renderTextArea("alamat", "Alamat")}
                                            {this.renderSelection("kecamatanId", "Kecamatan", kecamatan, "_id", "nama", data["kecamatanId"])}
                                            {this.renderFileInput("foto", "Foto")}
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
                params={useParams()} 
                navigate={useNavigate()} 
                location={useLocation()}
                {...props} />
    }
}

export default WithHooks(PohonForm);