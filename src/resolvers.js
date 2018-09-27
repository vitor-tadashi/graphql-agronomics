'use strict';

import request from 'request';
import { promisify } from 'util';

const fetch = promisify(request);
const url = 'https://dev3.agronomic.com:8105/api/v1';

const getUsers = auth => {

  // auth
  const authToken = new Buffer(`${auth.user}:${auth.password}`).toString('base64');

  const qs = {
    'bid': auth.bid,
    'include_all_data': 1
  };

  const headers = {
    'Authorization': `Basic ${authToken}`
  };

  return fetch({ url: `${url}/Users`, qs: qs, headers: headers })
    .then(res => {

      const users = JSON.parse(res.body);

      if (!Array.isArray(users)) {
        return {};
      }

      return users.map(user => ({
        'id': user.user_id,
        'username': user.username,
        'name': user.name,
        'email': user.email,
        'mobile_phone': user.mobile,
        'last_login': user.last_login
      }));
    })
    .catch(err => err);
};

const getUserAlerts = (userId, auth) => {

  // auth
  const authToken = new Buffer(`${auth.user}:${auth.password}`).toString('base64');

  const qs = {
    'bid': auth.bid,
    'include_all_data': 1
  };

  const headers = {
    'Authorization': `Basic ${authToken}`
  };

  return fetch({ url: `${url}/Users`, qs: qs, headers: headers })
    .then(res => {

      const users = JSON.parse(res.body);

      if (!Array.isArray(users)) {
        return {};
      }

      const user = users.filter(user => user.user_id === userId)[0];

      return {
        alerts_enabled: user.alerts_enabled,
        email_alert_days: user.email_alert_days,
        email_alert_point_verbosity: user.email_alert_point_verbosity,
        email_alert_zone_verbosity: user.email_alert_zone_verbosity,
        sms_alert_days: user.sms_alert_days,
        alert_start: user.alert_start,
        alert_end: user.alert_end
      };
    })
    .catch(err => err);
};

const resolvers = {
  Query: {
    users: (root, args) => getUsers(args.auth),
    alertConfig: (root, args) => getUserAlerts(args.userId, args.auth)
  }
};

export default resolvers;
