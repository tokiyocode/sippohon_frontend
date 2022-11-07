import React from "react";

const Modal = ({ title, body, btnSubmitLabel, btnCancelLabel, onClose, onSubmit }) => {
    return (
        <div className={"modal"}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                </div>
                <div className="modal-body">
                    <p>{body}</p>
                </div>
                <div className="modal-footer">
                    <button onClick={onClose} type="button" className="btn btn-success text-white" data-dismiss="modal">{btnCancelLabel}</button>
                    <button onClick={onSubmit} type="button" className="btn btn-danger text-white">{btnSubmitLabel}</button>
                </div>
                </div>
            </div>
            </div>
    );
}

export default Modal;