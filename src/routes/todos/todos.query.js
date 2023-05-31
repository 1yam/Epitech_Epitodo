const db = require('../../config/db');

exports.getAllTodoforAnId = function (userId) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM todo WHERE user_id = ?', [userId], function (
      err,
      results,
      fields
    ) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getTodosById = function (todoId) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM todo WHERE id = ?',
      [todoId],
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
  });
};

exports.getAllTodos = function () {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM todo',
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

exports.createTodo = function (title, description, due_time, status, user_id) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO todo (title, description, due_time, status, user_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [title, description, due_time, status, user_id];

    db.execute(query, values, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.updateTodo = function (id, title, description, due_time, status) {
  return new Promise((resolve, reject) => {
    db.execute(
      'UPDATE todo SET title = ?, description = ?, due_time = ?, status = ? WHERE id = ?',
      [title, description, due_time, status, id],
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.deleteTodo = function (id) {
  return new Promise((resolve, reject) => {
    db.execute(
      'DELETE FROM todo WHERE id = ?',
      [id],
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

