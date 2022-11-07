import React from "react";

const MultipleInputs = ({
        name, 
        label, 
        inputs,
        inputsContainerName, 
        type="text", 
        error, 
        onAddInput, 
        onDeleteInput, 
        onChange,
        ...others}) => {
    
    return (
            <div className="form-group">
                <div className='form-multiple'>
                    <label>{label}</label>
                    <span className="form-multiple-btn add" onClick={() => onAddInput(inputsContainerName)}>+</span>
                </div>
                <div className="col-md-12">
                    {inputs.map(input => {
                        return (
                            <div key={input.id} className="multiple-input-group">
                            <input 
                                type={type} 
                                className={"form-control form-control-line" + (error ? " error" : "")} 
                                name={name} 
                                onChange={() => onChange(name, inputsContainerName)} 
                                value={input.value ? input.value : ""}
                                {...others} />
                            <span onClick={() => onDeleteInput(name, input.id, inputsContainerName)} className="form-multiple-btn delete">-</span>
                        </div> );
                    })}
                    {error && <span className="input-error-message">{error}</span>}
                </div>
            </div>
    );
}

export default MultipleInputs;