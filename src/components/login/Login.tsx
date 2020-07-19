import React, { useContext, useCallback, useRef } from "react";
import "./Login.scss";
import logo from "../../assets/logo.png";
import { useHistory } from "react-router-dom";
import { gql, NetworkStatus } from "apollo-boost";
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
        fetchPolicy: "no-cache",
        onCompleted: () => {
            setTimeout(async () => {
                try {
                    const res: any = await context.refetch();
                    context.setIsLoggedIn(true);
                    context.setUser(res.data.authenticate);
                    history.push("/home");
                } catch (err) {
                    context.setIsLoggedIn(false);
                }
                context.dismissLoading();
            }, 500);
        },
        onError: (err) => {
            context.presentToast(parseError(err));
        },
    });

    const handleLogin = useCallback((event: any) => {
        console.log("HANDLE LOGIN");
        context.presentLoading();
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        if (!username) {
            context.dismissLoading();
            context.presentToast("Por favor ingrese su usuario.");
            return;
        }
        if (!password) {
            context.dismissLoading();
            context.presentToast("Por favor ingrese su contraseña.");
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
