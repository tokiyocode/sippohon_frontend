import React from "react";

const Input = ({name, label, error, type="text", onChange, ...others}) => {
    return (
        <div className="form-group">
            <label className="col-md-12">{label}</label>
            <div className="col-md-12">
                <input 
                    name={name} 
                    type={type} 
                    className={"form-control form-control-line" + (error ? " error" : "")} 
                    onChange={onChange}
                    {...others} />
            </div>
            {error && <span className="input-error-message">{error}</span>}
        </div>
    );
}

export default Input;