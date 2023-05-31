const db = require('../../config/db');
const bcrypt = require('bcryptjs');

exports.getUserById = function (id) {
  return new Promise((resolve, reject) => {
    if (id === undefined) {
      reject(new Error('User ID is undefined'));
    } else {
      db.query(
        'SELECT * FROM user WHERE id = ? LIMIT 1',
        [id],
        function (err, results, fields) {
          if (err) {
            reject(err);
          } else {
            if (results.length === 0) {
              resolve(null);
            } else {
              resolve(results[0]);
            }
          }
        }
      );
    }
  });
};



exports.getAllUser = function () {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM `user`', function (err, results, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getUserByEmail = function (email) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM user WHERE email = ? LIMIT 1',
      [email],
      function (err, results, fields) {
        if (err) {
          reject(err);
        } else {
          const user = results.length ? results[0] : null;
          resolve(user);
        }
      }
    );
  });
};

exports.createUser = function (email, password, name, firstname) {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.execute(
        'INSERT INTO `user` (email, password, name, firstname) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, name, firstname],
        function (err, results, fields) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

exports.checkAccountByName = function (name) {
  return new Promise((resolve, reject) => {
    db.execute(
      'SELECT * FROM `user` WHERE name = ?',
      [name],
      function (err, results, fields) {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            reject(results);
          } else {
            resolve(results);
          }
        }
      }
    );
  });
};

exports.checkAccountByEmail = function (email) {
  return new Promise((resolve, reject) => {
    db.execute(
      'SELECT * FROM `user` WHERE email = ?',
      [email],
      function (err, results, fields) {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            reject(results);
          } else {
            resolve(results);
          }
        }
      }
    );
  });
};

exports.deleteUser = function (id) {
  return new Promise((resolve, reject) => {
    db.execute(
      'DELETE FROM `user` WHERE id = ?',
      [id],
      function (err, results, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

exports.updateUser = function (id, email, password, name, firstname) {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.execute(
        'UPDATE `user` SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?',
        [email, hashedPassword, name, firstname, id],
        function (err, results, fields) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};
