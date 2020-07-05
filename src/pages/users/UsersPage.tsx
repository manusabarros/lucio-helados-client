import React from "react";
import "./UsersPage.scss";
import Users from "../../components/users/Users";

const UsersPage = (props: any) => {
    return (
        <section className="UsersPage">
            <Users />
        </section>
    );
};

export default UsersPage;
