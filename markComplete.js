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

async function markComplete() {
  const tasks = loadTasks();
  const incompleteTasks = tasks.filter(task => !task.completed);

  if (incompleteTasks.length === 0) {
    console.log(chalk.green('All tasks are already marked as complete.'));
    return;
  }

  const { taskIndex } = await inquirer.prompt({
    type: 'list',
    name: 'taskIndex',
    message: 'Choose a task to mark as complete:',
    choices: incompleteTasks.map((task, index) => ({
      name: task.title,
      value: tasks.indexOf(task)
    }))
  });

  tasks[taskIndex].completed = true;
  saveTasks(tasks);

  console.log(chalk.green('Task marked as complete!'));
}

module.exports = markComplete;
