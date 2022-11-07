import { getRoles } from "../../services/roleService";
import React from "react";
import Breadcrumb from "../Breadcrumb";
import Form from "./Form";
import Sidebar from "../Sidebar"
import Joi from "joi";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { getUser, saveUser } from "../../services/userService";

class AdminForm extends Form {
    state = {
        data: {
            nama: "",
            username: "",
            password: "",
            roleId: ""
        },
        errors: {},
        roles: []
    };

    async componentDidMount() {
        const {data: roles} = await getRoles();
        this.setState({ roles });

        const {params, navigate} = this.props;
        if (params._id === "new")
            return;

        try {
            const {data: user} = await getUser(params._id);
            const data = this.mapToViewModel(user);
            this.setState({ data });
        } catch {
            return navigate("/not-found", {replace: true});
        }
    }
    
    schema = {
        _id: Joi.string(),
        nama: Joi.string().min(3).max(255).required().messages({
            "string.empty": "nama tidak boleh kosong",
            "string.min": "nama setidaknya memiliki panjang 3 character",
            "string.max": "nama tidak boleh lebih dari 255 character"
        }),
        username: Joi.string().alphanum().min(3).max(50).required({
            "string.empty": "username tidak boleh kosong",
            "string.alphanum": "username tidak boleh menggunakan non-alphanumeric character",
            "string.min": "username setidaknya memiliki panjang 5 character",
            "string.max": "username tidak boleh lebih dari 50 character"
        }),
        password: Joi.string().alphanum().min(3).max(18).required({
            "string.empty": "password tidak boleh kosong",
            "string.alphanum": "password tidak boleh menggunakan non-alphanumeric character",
            "string.min": "password setidaknya memiliki panjang 3 character",
            "string.max": "password tidak boleh lebih dari 18 character"
        }),
        roleId: Joi.string().required().messages({
            "string.empty": "role tidak boleh kosong"
        })
    };

    mapToViewModel(user) {
        return {
            _id: user._id,
            nama: user.nama,
            username: user.username,
            password: "",
            roleId: user.role._id
        };
    }

    getFormType() {
        const {data} = this.state;
        if (data._id)
            return "Form Update";

        return "Form Create";
    }

    redirect() {
        const { location, navigate } = this.props;
        const { from: previousPage } = location.state;

        return navigate(previousPage, {
            replace: true,
            state: {
                formType: this.getFormType()
            }
        });
    }

    async doSubmit() {
        await saveUser(this.state.data);

        this.redirect();
    }

    render() {
        const { data, roles } = this.state;

        return (
            <>
                <Sidebar />
                <div className="page-wrapper">
                    <div className="page-breadcrumb">
                        <div className="row-align-items-center">
                            <div className="col-6">
                                <Breadcrumb path={["Form", "Admin"]} />
                                <h1 className="mb-0 fw-bold">Admin</h1>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off">
                                            {this.renderInput("nama", "Nama", "string", true)}
                                            {this.renderInput("username", "Username")}
                                            {this.renderInput("password", "Password", "password")}
                                            {this.renderSelection("roleId", "Role", roles, "_id", "label", data["roleId"])}
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

function WrappedComponent(Component) {
    return function ComponentWithHooks(props) {
        return <Component 
                    {...props} 
                    params={useParams()} 
                    navigate={useNavigate()} 
                    location={useLocation()}
                />
    }
}

export default WrappedComponent(AdminForm);