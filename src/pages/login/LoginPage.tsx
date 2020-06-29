import React from "react";
import "./LoginPage.scss";
import LoginForm from "../../components/login-form/LoginForm";

const LoginPage = (props: any) => {
    return (
        <div className="LoginPage">
            <LoginForm/>
        </div>
    );
};

export default LoginPage;
