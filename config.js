const envConfigs = {
  development: {
    apiUrl: "https://rx4y9fk2r8.execute-api.us-east-1.amazonaws.com/dev/",
    redeemLinkHost: "https://quirky-davinci-4da258.netlify.com",
    sdkEnv: "Sokol"
    // apiUrl: "https://qtet5hdaeb.execute-api.us-east-1.amazonaws.com/prod/",
    // redeemLinkHost: "https://omi-daily-wallet.odyssy.io",
    // sdkEnv: "Xdai"
  },
  production: {
    apiUrl: "https://qtet5hdaeb.execute-api.us-east-1.amazonaws.com/prod/",
    redeemLinkHost: "https://omi-daily-wallet.odyssy.io",
    sdkEnv: "Xdai"
  }
};
const config = envConfigs[process.env["NODE_ENV"]];
export default {
  ...config
};
