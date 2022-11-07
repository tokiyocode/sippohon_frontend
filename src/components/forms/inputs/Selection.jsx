import React from "react";

const LabeledSelection = ({optionLabel, optionValue, name, label, options, defaultValue, error, ...others}) => {
    return (
        <div className="form-group">
            <label className="col-sm-12">{label}</label>
            <div className="col-sm-12">
                <select name={name} value={defaultValue} {...others} className={"form-select shadow-none form-control-line" + (error ? " error" : "")}>
                    <option value=""></option>
                    {options.map(option => (
                        <option
                            key={option[optionValue]}
                            value={option[optionValue]}>
                                {option[optionLabel]}
                        </option>
                    ))}
                </select>
                {error && <span className="input-error-message">{error}</span>}
            </div>
        </div>
    );
}

LabeledSelection.defaultProps = {
    optionLabel: "label",
    optionValue: "value"
};

export default LabeledSelection;