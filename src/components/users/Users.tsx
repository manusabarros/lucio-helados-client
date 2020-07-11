import React, { useState } from "react";
import "./Users.scss";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";

const GET_USERS = gql`
    query {
        getUsers {
            id
            username
            firstName
            lastName
            roleId
        }
    }
`;

const Users = (props: any) => {
    const [users, setUsers] = useState([]);
    useQuery(GET_USERS, { onCompleted: ({ getUsers }) => setUsers(getUsers) });

    return (
        <div className="Users">
            {users.map((user: any, index: number) => (
                <p key={index}>{user.firstName}</p>
            ))}
        </div>
    );
};

export default Users;
