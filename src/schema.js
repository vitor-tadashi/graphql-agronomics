'use strict';

const schema = `
type Query {
    users(bid: Int!, auth: Auth!): [Users!]!
}

type Users {

    user_id: Int!
    username: String!
    name: String!
    email: String!
    mobile: String!
    
    user_type_id: Int!
    grower_account_id: Int!
    field_activation_right_id: Int!
    first: String!
    last: String!
    alert_start: String
    alert_end: String
    last_login: String
    sms_alert_days: Int!
    alerts_enabled: Int!
    email_alert_days: Int!
    email_alert_zone_verbosity: Int!
    email_alert_point_verbosity: Int!
    
}

input Auth {
    user: String!
    password: String!
}

schema {
    query: Query
}`;

export default schema;
