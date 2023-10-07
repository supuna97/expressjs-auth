const db = require("../config/database");

const User = {
  create: (user) => {
    return db
      .promise()
      .execute(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [user.username, user.email, user.password]
      );
  },

  findByEmail: (email) => {
    return db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
  },
};

module.exports = User;
