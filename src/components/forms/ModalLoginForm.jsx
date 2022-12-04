import React from "react";
import Form from "./Form";
import Joi from "joi";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";


class ModalLoginForm extends Form {
    state = {
        data: {
            username: "",
            password: ""
        },
        errors: {}
    };

    schema = {
        username: Joi.string().alphanum().min(5).max(50).required().messages({
            "string.empty": "username tidak boleh kosong",
            "string.alphanum": "username tidak boleh menggunakan non-alphanumeric character",
            "string.min": "username setidaknya memiliki panjang 5 character",
            "string.max": "username tidak boleh lebih dari 50 character"
        }),
        password: Joi.string().alphanum().min(3).max(18).required().messages({
            "string.empty": "password tidak boleh kosong",
            "string.alphanum": "password tidak boleh menggunakan non-alphanumeric character",
            "string.min": "password setidaknya memiliki panjang 3 character",
            "string.max": "password tidak boleh lebih dari 18 character"
        })
    };

    async doSubmit() {
        try {
            const data = {...this.state.data};
            const {data: jwt} = await login(data.username, data.password);
            localStorage.setItem('token', jwt);
            return this.props.navigate(0, {replace: true});
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = this.state.errors;
                errors.username = "username tidak cocok dengan password";
                this.setState({errors});
            }
        }

    }

    render() {
        return (
            <div className="modal">
                <div className="login-container">
                    <div className="login-wrapper">
                        <div className="login-image-wrapper">
                            <img src={require("../../assets/images/sippohon_logo_120.webp")} />
                        </div>
                        <form onSubmit={(e) => this.handleSubmit(e)} autoComplete="off" className="login-form">
                            {this.renderInput("username", "Username", "string", true)}
                            {this.renderInput("password", "Password", "password")}
                            <div className="login-form-btn-wrapper">
                                <button type={"submit"} className="btn btn-success text-white login-form-btn">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

function WithHooks(Component) {
    return function WrappedComponent(props) {
        return <Component {...props} navigate={useNavigate()} />;
    }
}

export default WithHooks(ModalLoginForm);