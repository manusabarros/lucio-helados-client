import React from "react";
import "./SalesPage.scss";
import Sales from "../../components/sales/Sales";

const SalesPage = (props: any) => {
    return (
        <section className="SalesPage">
            <Sales />
        </section>
    );
};

export default SalesPage;
