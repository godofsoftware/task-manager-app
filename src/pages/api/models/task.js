const db = require('../config/db');

async function getAllTasks() {
  const [rows] = await db.query('SELECT * FROM tasks');
  return rows;
}

async function getTaskById(id) {
  const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows[0];
}

async function createTask(task) {
  const { title, description, status } = task;
  const [result] = await db.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, status]);
  return { id: result.insertId, ...task };
}

async function updateTask(id, task) {
  const { title, description, status } = task;
  await db.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id]);
  return { id, ...task };
}

async function deleteTask(id) {
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
