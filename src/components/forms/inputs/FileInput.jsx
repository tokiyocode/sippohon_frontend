import React from "react";

const FileInput = ({name, label, error, onChange, ...others}) => {
    return (
        <div className="form-group">
            <label className="col-md-12">{label}</label>
            <div className="col-md-12">
                <input 
                    name={name} 
                    type={"file"} 
                    className={"form-control form-control-line" + (error ? " error" : "")} 
                    onChange={(event) => onChange(event.currentTarget)}
                    {...others} />
            </div>
            {error && <span className="input-error-message">{error}</span>}
        </div>
    );
}

export default FileInput;