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

async function deleteTask() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log(chalk.red('No tasks available to delete.'));
    return;
  }

  const { taskIndex } = await inquirer.prompt({
    type: 'list',
    name: 'taskIndex',
    message: 'Choose a task to delete:',
    choices: tasks.map((task, index) => ({ name: task.title, value: index }))
  });

  const deletedTask = tasks.splice(taskIndex, 1);
  saveTasks(tasks);

  console.log(chalk.green(`Task "${deletedTask[0].title}" deleted successfully!`));
}

module.exports = deleteTask;
