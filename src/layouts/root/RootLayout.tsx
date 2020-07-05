import React from "react";
import "./RootLayout.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../../components/header/Header";
import HomePage from "../../pages/home/HomePage";
import UsersPage from "../../pages/users/UsersPage";
import StockPage from "../../pages/stock/StockPage";
import SalesPage from "../../pages/sales/SalesPage";

const RootLayout = (props: any) => {
    return (
        <div className="RootLayout">
            <Header />
            <main className="pages">
                <Switch>
                    <Route path="/home" exact>
                        <HomePage />
                    </Route>
                    <Route path="/sales" exact>
                        <SalesPage />
                    </Route>
                    <Route path="/stock" exact>
                        <StockPage />
                    </Route>
                    <Route path="/users" exact>
                        <UsersPage />
                    </Route>
                    <Redirect to="/home" />
                </Switch>
            </main>
        </div>
    );
};

export default RootLayout;
