import React, { useState } from "react";
import "./App.scss";
import { Context } from "./shared/context/Context";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import RootLayout from "./layouts/root/RootLayout";
import AuthLayout from "./layouts/auth/AuthLayout";

const AUTHENTICATE = gql`
    query {
        authenticate
    }
`;

const App = (props: any) => {
    const [isLoggedIn, setIsLoggedIn]: any[] = useState();
    useQuery(AUTHENTICATE, {
        onCompleted: () => setIsLoggedIn(true),
        onError: () => setIsLoggedIn(false),
    });

    return (
        <div className="App">
            <Context.Provider value={{ setIsLoggedIn }}>
                <BrowserRouter>
                    {isLoggedIn === false && <AuthLayout />}
                    {isLoggedIn === true && <RootLayout />}
                </BrowserRouter>
            </Context.Provider>
        </div>
    );
};

export default App;
