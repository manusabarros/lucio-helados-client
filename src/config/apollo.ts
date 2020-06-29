import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
    link: createHttpLink({
        uri: process.env.REACT_APP_API_URL as string,
        credentials: "include",
    }),
    cache: new InMemoryCache(),
});

export default client;
