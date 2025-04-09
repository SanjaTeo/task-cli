#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const taskManager = require("./utils/taskManager");

async function mainMenu() {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: chalk.blue("What would you like to do?"),
    choices: [
      "View Tasks",
      "Add Task",
      "Update Task",
      "Delete Task",
      "Mark Task as Complete",
      "Exit"
    ]
  });

  switch (action) {
    case "View Tasks":
      await taskManager.viewTasks();
      break;
    case "Add Task":
      await taskManager.addTask();
      break;
    case "Update Task":
      await taskManager.updateTask();
      break;
    case "Delete Task":
      await taskManager.deleteTask();
      break;
    case "Mark Task as Complete":
      await taskManager.markComplete();
      break;
    case "Exit":
      console.log(chalk.green("Goodbye!"));
      return;
  }

  await mainMenu(); // show menu again
}

mainMenu();
