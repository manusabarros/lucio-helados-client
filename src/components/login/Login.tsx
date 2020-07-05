import React, { useContext, useCallback } from "react";
import "./Login.scss";
import logo from "../../assets/logo.png";
import { useHistory } from "react-router-dom";
import { gql } from "apollo-boost";
import { useLazyQuery } from "react-apollo";
import { Context } from "../../shared/Context";
import { parseError } from "../../utils/utils";

const LOGIN = gql`
    query Login($username: String!, $password: String!) {
        login(input: { username: $username, password: $password }) {
            token
        }
    }
`;

const Login = (props: any) => {
    const context = useContext(Context);
    const history = useHistory();
    const [login] = useLazyQuery(LOGIN, {
        onCompleted: async () => {
            const { data }: any = await context.authenticateResp.refetch();
            context.setUser(data.authenticate);
            context.setIsLoggedIn(true);
            history.push("/home");
            context.dismissLoading();
        },
        onError: (err) => {
            context.presentToast(parseError(err));
            context.dismissLoading();
        },
    });

    const handleLogin = useCallback((event: any) => {
        context.presentLoading();
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        if (!username) {
            context.presentToast("Por favor ingrese su usuario.");
            context.dismissLoading();
            return;
        }
        if (!password) {
            context.presentToast("Por favor ingrese su contraseña.");
            context.dismissLoading();
            return;
        }
        login({ variables: { username, password } });
    }, []);

    return (
        <div className="LoginForm">
            <img src={logo} alt="lucio-helados-logo" />
            <span>Ingrese para continuar</span>
            <form onSubmit={handleLogin} method="POST">
                <input type="text" name="username" placeholder="Usuario" autoCapitalize="none" />
                <input type="password" name="password" placeholder="Contraseña" autoCapitalize="none" />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
