module.exports = {
  "development": {
    "username": process.env.MYSQLUSER || "root",
    "password": process.env.MYSQLPASSWORD || null,
    "database": process.env.MYSQLDATABASE || "pokemart_db",
    "host": process.env.MYSQLHOST || "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.MYSQLUSER || "root",
    "password": process.env.MYSQLPASSWORD || null,
    "database": process.env.MYSQLDATABASE || "pokemart_db",
    "host": process.env.MYSQLHOST || "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQLUSER || "root",
    "password": process.env.MYSQLPASSWORD || null,
    "database": process.env.MYSQLDATABASE || "pokemart_db",
    "host": process.env.MYSQLHOST || "127.0.0.1",
    "dialect": "mysql"
  }
}
