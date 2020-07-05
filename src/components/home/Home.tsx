import React, { useContext } from "react";
import "./Home.scss";
import salesIcon from "../../assets/sales-icon.png";
import stockIcon from "../../assets/stock-icon.png";
import userIcon from "../../assets/user-icon.png";
import HomeButton from "../home-button/HomeButton";
import { Context } from "../../shared/Context";

const buttons: any[] = [
    {
        name: "sales",
        image: salesIcon,
        alt: "sales-icon",
        title: "Ventas",
        path: "/sales",
    },
    {
        name: "stock",
        image: stockIcon,
        alt: "stock-icon",
        title: "Inventario",
        path: "/stock",
    },
    {
        name: "users",
        image: userIcon,
        alt: "user-icon",
        title: "Usuarios",
        path: "/users",
    },
];

const Home = (props: any) => {
    const context: any = useContext(Context);

    return (
        <div className="Home">
            <span>Hola {context.user.firstName}</span>
            <div className="buttons">
                {buttons.map((button, index) => {
                    return <HomeButton key={index} button={button} />;
                })}
            </div>
        </div>
    );
};

export default Home;
