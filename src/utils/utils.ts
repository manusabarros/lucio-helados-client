import { ApolloError } from "apollo-boost";

export const parseError = (err: ApolloError) => err.graphQLErrors[0].message;
