import React from "react";
import CircleButton from "./CircleButton";

const MediaObject = ({title, btnIconClass, btnClass }) => {
    return (
        <div className="mt-4 pb-3 d-flex align-items-center">
            <CircleButton btnClass={btnClass} iconClass={btnIconClass} />
            <div className="ms-3">
                <h5 className="mb-0 fw-bold">{title}</h5>
            </div>
        </div>
    );
}

export default MediaObject;