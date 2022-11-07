import React from "react";

const TextArea = ({name, label, error, value, onChange}) => {
    return (
        <div className="form-group">
            <label className="col-md-12">{label}</label>
            <div className="col-md-12">
                <textarea 
                    name={name} 
                    rows="5" 
                    className={"form-control form-control-line" + (error ? " error" : "")}
                    onChange={onChange}
                    value={value} />
            </div>
            {error && <span className="input-error-message">{error}</span>}
        </div>
    );
}

export default TextArea;