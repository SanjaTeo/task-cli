const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/tasks.json');

function loadTasks() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function viewTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log(chalk.yellow('No tasks available.'));
    return;
  }

  console.log(chalk.bold('\nYour Tasks:\n'));
  tasks.forEach((task, index) => {
    const status = task.completed ? chalk.green('✔') : chalk.red('✘');
    console.log(`${index + 1}. ${status} ${task.title} ${task.dueDate ? `(${chalk.gray(task.dueDate)})` : ''}`);
  });
}

module.exports = viewTasks;
