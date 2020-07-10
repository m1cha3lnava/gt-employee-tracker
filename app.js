const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Mwd768!!!",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

// function which prompts the user for what action they should take
function start() {
  // console.log("app init");
  inquirer
    .prompt({
      name: "primaryChoice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Exit",
      ],
    })
    .then(function (answer) {
      // based on their answer, prompt the user with the right questions
      const primaryQuest = answer;
      console.log(answer.primaryChoice);
      console.log(typeof answer.primaryChoice);
      if (answer.primaryChoice === "View All Employees") {
        // console.log("View All Employees");
        viewAll();
        start();
      } else if (answer.primaryChoice === "View All Employees By Department") {
        // console.log("option 1");
        start();
      } else if (answer.primaryChoice === "View All Employees By Manager") {
        console.log("option 2");
      } else if (answer.primaryChoice === "Add Employee") {
        console.log("option 3");
      } else if (answer.primaryChoice === "Remove Employee") {
        console.log("option 4");
      } else if (answer.primaryChoice === "Update Employee Role") {
        console.log("option 5");
      } else if (answer.primaryChoice === "Update Employee Manager") {
        console.log("option 6");
      } else if (answer.primaryChoice === "View All Roles") {
        console.log("option 7");
      } else if (answer.primaryChoice === "Exit") {
        console.log("Have a good day!");
        connection.end();
      } else {
        console.log("PQ error");
        connection.end();
      }
    });
}
// View All Employees
function viewAll() {
  console.log("All Employees: ");
  let deptQuery =
    "SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name, role.salary, employees.manager_id FROM employees INNER JOIN role ON employees.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY employees.last_name;";
  connection.query(deptQuery, function (err, res) {
    if (err) throw err;
    // console.log(res);
    console.table(res);
    connection.end();
  });
}
