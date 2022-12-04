import Joi from "joi";
import { Component } from 'react';
import { v4 as uuidv4 } from "uuid";
import Input from './inputs/Input';
import Selection from './inputs/Selection';
import TextArea from "./inputs/TextArea";
import MultipleInputs from './inputs/MultipleInputs';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate = () => {
        const {data} = this.state;
        const {error} = Joi.object(this.schema).validate(data, {abortEarly: false});
        if (!error) return null;

        const errors = {};
        for (let item of error.details) 
            errors[item.path[0]] = item.message;

        return errors;
    }

    validateProperty = ({name, value}) => {
        const obj = { [name]: value };
        const schema = Joi.object({ [name]: this.schema[name] });
        const { error } = schema.validate(obj);

        return error ? error.details[0].message : null;
    }

    handleChange = ({currentTarget: input}) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input); 
        if (errorMessage) 
            errors[input.name] = errorMessage;
        else
             delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;


        this.setState({ data, errors });
    }

    handleMultipleInputsChange = (name, inputsContainerName) => {
        const {[inputsContainerName]: inputs} = this.state;
        const domInputs = document.getElementsByName(name); // Bad practice, refactor it in the future
        
        let index = 0;
        const items = [];
        for (let input of domInputs) {
            if (input.value)
               items.push(input.value);

            inputs[index++]["value"] = input.value;
        }

        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty({name, value: items}); 
        if (errorMessage) 
            errors[name] = errorMessage;
        else
            delete errors[name];

        this.setState({errors});
        
        const {data} = this.state;
        data[name] = items;
        this.setState({ data, [inputsContainerName]: inputs });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        this.doSubmit();
    }

    handleAddAnotherInput = (inputsContainerName) => {
        const {[inputsContainerName]: inputs} = this.state; 
        inputs.push({id: uuidv4()});
        this.setState({ [inputsContainerName]: inputs });
    }

    handleDeleteInput = (name, id, inputsContainerName) => {
        let {[inputsContainerName]: inputs} = this.state;
        inputs = inputs.filter(input => input.id !== id);

        const items = [];
        for (let input of inputs)
            items.push(input.value);

        const {data} = this.state;
        data[name] = items;
        this.setState({[inputsContainerName]: inputs, data});
    }

    renderInput(name, label, type="text", autoFocus=false) {
        const {data, errors} = this.state;
        
        return <Input 
                    name={name} 
                    label={label} 
                    type={type}
                    error={errors[name]}
                    value={data[name]}
                    autoFocus={autoFocus}
                    onChange={this.handleChange} />
    }

    renderTextArea(name, label) {
        const {data, errors} = this.state;
        
        return <TextArea 
                    name={name} 
                    label={label}
                    error={errors[name]}
                    onChange={this.handleChange}
                    value={data[name]} />
    }

    renderSelection(name, label, options, optionValue, optionLabel, defaultValue) {
        const {errors} = this.state;

        return <Selection
                name={name}
                label={label}
                options={options}
                error={errors[name]}
                optionValue={optionValue}
                optionLabel={optionLabel}
                onChange={this.handleChange}
                defaultValue={defaultValue} />
    }

    renderMultipleInputs(name, label, inputsContainerName, type) {
        const {[inputsContainerName]: inputs, errors} = this.state;

        return <MultipleInputs
                            name={name}
                            label={label}
                            inputsContainerName={inputsContainerName}
                            inputs={inputs}
                            type={type}
                            error={errors[name]}
                            onAddInput={this.handleAddAnotherInput}
                            onDeleteInput={this.handleDeleteInput}
                            onChange={this.handleMultipleInputsChange}
                             />;
    }

    renderPrimaryButton(label) {
        return (
            <div className="form-group btn">
                <div className="col-sm-12 mt-4">
                    <input disabled={this.validate()} type="submit" className="btn btn-success text-white" value={label} />
                </div>
            </div>
        );
    }
}


export default Form;