const envConfigs = {
  development: {
    apiUrl: ""
  },
  production: {
    apiUrl: ""
  }
};

const config = envConfigs[process.env["NODE_ENV"]];

export default {
  ...config
};
