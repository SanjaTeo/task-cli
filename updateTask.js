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

async function updateTask() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log(chalk.red('No tasks available to update.'));
    return;
  }

  const { taskIndex } = await inquirer.prompt({
    type: 'list',
    name: 'taskIndex',
    message: 'Choose a task to update:',
    choices: tasks.map((task, index) => ({ name: task.title, value: index }))
  });

  const { newTitle, newDueDate } = await inquirer.prompt([
    { name: 'newTitle', message: 'New title:', default: tasks[taskIndex].title },
    { name: 'newDueDate', message: 'New due date:', default: tasks[taskIndex].dueDate }
  ]);

  tasks[taskIndex].title = newTitle;
  tasks[taskIndex].dueDate = newDueDate;
  saveTasks(tasks);

  console.log(chalk.green('Task updated successfully!'));
}

module.exports = updateTask;
