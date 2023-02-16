const {config} = require('dotenv');

config();

module.exports = {
  "development": {
    "username": process.env.MYSQLUSER || "root",
    "password": process.env.MYSQLPASSWORD || "POcce8Z6PRdfMpEkOVFq",
    "database": process.env.MYSQLDATABASE || "railway",
    "host": process.env.MYSQLHOST || "containers-us-west-21.railway.app",
    "dialect": "mysql",
    "port": process.env.MYSQLPORT || 5671
  },
  "test": {
    "username": process.env.MYSQLUSER || "root",
    "password": process.env.MYSQLPASSWORD || "POcce8Z6PRdfMpEkOVFq",
    "database": process.env.MYSQLDATABASE || "railway",
    "host": process.env.MYSQLHOST || "containers-us-west-21.railway.app",
    "dialect": "mysql",
    "port": process.env.MYSQLPORT || 5671
  },
  "production": {
    "username": process.env.MYSQLUSER || "root",
    "password": process.env.MYSQLPASSWORD || "POcce8Z6PRdfMpEkOVFq",
    "database": process.env.MYSQLDATABASE || "railway",
    "host": process.env.MYSQLHOST || "containers-us-west-21.railway.app",
    "dialect": "mysql",
    "port": process.env.MYSQLPORT || 5671
  }
}
