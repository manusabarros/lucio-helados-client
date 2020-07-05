import React from "react";
import "./Toast.scss";

const Toast = ({ message }: any) => {
    return (
        <div className="Toast">
            <span>{message}</span>
        </div>
    );
};

export default Toast;
