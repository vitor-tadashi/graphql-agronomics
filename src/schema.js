'use strict';

const schema = `
type Query {
    users(auth: Auth!): [Users!]!
    alertConfig(userId: Int!, auth: Auth!): AlertConfig!
}

type Users {
    id: Int!
    username: String!
    name: String!
    email: String!
    mobile_phone: String!
    last_login: String
}

type AlertConfig {
    alerts_enabled: Int!
    email_alert_days: Int!
    email_alert_point_verbosity: Int!
    email_alert_zone_verbosity: Int!
    sms_alert_days: Int!
    alert_start: String
    alert_end: String
}

input Auth {
    bid: Int!
    user: String!
    password: String!
}

schema {
    query: Query
}`;

export default schema;
