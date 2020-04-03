const dotEnvResult = require("dotenv").config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

module.exports = {
  env: {
    UCSB_API_KEY: process.env.UCSB_API_KEY,
    UCSB_API_SECRET: process.env.UCSB_API_SECRET,
  },
  experimental: {
    jsconfigPaths: true,
  },
};
