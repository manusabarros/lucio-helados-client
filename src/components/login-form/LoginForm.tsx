import React, { useContext } from "react";
import "./LoginForm.scss";
import { useHistory } from "react-router-dom";
import { gql } from "apollo-boost";
import { useLazyQuery } from "react-apollo";
import { Context } from "../../shared/context/Context";

const LOGIN = gql`
    query Login($username: String!, $password: String!) {
        login(input: { username: $username, password: $password }) {
            token
        }
    }
`;

const LoginForm = (props: any) => {
    const context = useContext(Context);
    const history = useHistory();
    const [login, loginResp] = useLazyQuery(LOGIN, {
        onCompleted: () => {
            context.setIsLoggedIn(true);
            history.push("/home");
        },
    });

    const handleLogin = (event: any) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        login({ variables: { username, password } });
    };

    return (
        <div className="LoginForm">
            <form onSubmit={handleLogin} method="POST">
                <input type="text" name="username" placeholder="Username" autoCapitalize="none" />
                <input type="password" name="password" placeholder="Password" autoCapitalize="none" />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default LoginForm;
