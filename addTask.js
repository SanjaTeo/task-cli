const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/tasks.json');

function loadTasks() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

async function addTask() {
  const { title, dueDate } = await inquirer.prompt([
    { name: 'title', message: 'Task title:' },
    { name: 'dueDate', message: 'Due date (optional):' }
  ]);

  const tasks = loadTasks();
  tasks.push({ title, dueDate, completed: false });
  saveTasks(tasks);

  console.log(chalk.green('Task added successfully!'));
}

module.exports = addTask;
