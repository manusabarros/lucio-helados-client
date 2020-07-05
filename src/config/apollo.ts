import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    credentials: "include",
});

export default client;
