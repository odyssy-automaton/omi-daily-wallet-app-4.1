const envConfigs = {
  development: {
    apiUrl: "https://rx4y9fk2r8.execute-api.us-east-1.amazonaws.com/dev/"
  },
  production: {
    apiUrl: "https://rx4y9fk2r8.execute-api.us-east-1.amazonaws.com/dev/"
  }
};
const config = envConfigs[process.env["NODE_ENV"]];
export default {
  ...config
};