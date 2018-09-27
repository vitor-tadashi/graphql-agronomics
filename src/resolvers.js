'use strict';

import request from 'request';
import { promisify } from 'util';

const fetch = promisify(request);
const url = 'https://dev3.agronomic.com:8105/api/v1';

const getUsers = (bid, auth) => {

  // auth
  const authToken = new Buffer(`${auth.user}:${auth.password}`).toString('base64');

  const headers = {
    'Authorization': `Basic ${authToken}`
  };

  return fetch({ url: `${url}/Users?bid=${bid}`, headers: headers })
    .then(res => JSON.parse(res.body))
    .catch(err => err);
};

const resolvers = {
  Query: {
    users: (root, args) => getUsers(args.bid, args.auth)
  }
};

export default resolvers;
