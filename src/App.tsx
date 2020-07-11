import React, { useState, useCallback, useRef, useEffect } from "react";
import "./App.scss";
import { Context } from "./shared/Context";
import { HashRouter } from "react-router-dom";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import RootLayout from "./layouts/root/RootLayout";
import AuthLayout from "./layouts/auth/AuthLayout";
import Loading from "./components/loading/Loading";
import Toast from "./components/toast/Toast";

const AUTHENTICATE = gql`
    query {
        authenticate {
            id
            username
            firstName
            lastName
            roleId
        }
    }
`;

const App = (props: any) => {
    const [isLoggedIn, setIsLoggedIn]: any[] = useState();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const loadingCount = useRef(0);

    const authenticateResp = useQuery(AUTHENTICATE, {
        onCompleted: (data) => {
            setIsLoggedIn(true);
            setUser(data.authenticate);
            dismissLoading();
        },
        onError: () => {
            setIsLoggedIn(false);
            dismissLoading();
        },
    });

    const presentLoading = useCallback(() => {
        loadingCount.current++;
        setLoading(true);
    }, []);

    const dismissLoading = useCallback(() => {
        loadingCount.current--;
        if (loadingCount.current === 0) {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }, []);

    const presentToast = useCallback((message: string) => {
        setToast(true);
        setToastMessage(message);
        setTimeout(() => {
            setToast(false);
        }, 3000);
    }, []);

    useEffect(() => {
        presentLoading();
    }, []);

    return (
        <div className="App">
            {loading && <Loading />}
            {toast && <Toast message={toastMessage} />}
            <Context.Provider
                value={{
                    setIsLoggedIn,
                    user,
                    setUser,
                    authenticateResp,
                    presentLoading,
                    dismissLoading,
                    presentToast,
                }}
            >
                <HashRouter>
                    {isLoggedIn === false && <AuthLayout />}
                    {isLoggedIn === true && <RootLayout />}
                </HashRouter>
            </Context.Provider>
        </div>
    );
};

export default App;
