'use strict';

const schema = `
type Query {
    users(bid: Int!, auth: Auth!): [Users!]!
}

type Users {
    user_type_id: Int!
    user_id: Int!
    name: String!
}

input Auth {
    user: String!
    password: String!
}

schema {
    query: Query
}`;

export default schema;
