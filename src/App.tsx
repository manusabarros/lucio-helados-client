import React, { useState, useCallback, useRef, useEffect } from "react";
import "./App.scss";
import { Context } from "./shared/Context";
import { BrowserRouter } from "react-router-dom";
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
    const loadingRef = useRef(false);

    const { refetch } = useQuery(AUTHENTICATE, {
        onCompleted: (data) => {
            setIsLoggedIn(true);
            setUser(data.authenticate);
            dismissLoading();
        },
        onError: () => {
            dismissLoading();
            setIsLoggedIn(false);
        },
    });

    useEffect(() => {
        presentLoading();
    }, []);

    const presentLoading = useCallback(() => {
        if (!loadingRef.current) {
            setLoading(true);
            loadingRef.current = true;
        }
    }, []);

    const dismissLoading = useCallback(() => {
        if (loadingRef.current) {
            setTimeout(() => {
                setLoading(false);
                loadingRef.current = false;
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

    return (
        <div className="App">
            {loading && <Loading />}
            {toast && <Toast message={toastMessage} />}
            <Context.Provider
                value={{
                    setIsLoggedIn,
                    user,
                    setUser,
                    refetch,
                    presentLoading,
                    dismissLoading,
                    presentToast,
                }}
            >
                <BrowserRouter>
                    {isLoggedIn === false && <AuthLayout />}
                    {isLoggedIn === true && <RootLayout />}
                </BrowserRouter>
            </Context.Provider>
        </div>
    );
};

export default App;
