import React from "react";
import "./StockPage.scss";
import Stock from "../../components/stock/Stock";

const StockPage = (props: any) => {
    return (
        <section className="StockPage">
            <Stock />
        </section>
    );
};

export default StockPage;
