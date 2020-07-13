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
  // console.log("app initialized");
  inquirer
    .prompt([
      {
        name: "primaryChoice",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View All Roles",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      // based on their answer, prompt the user with the right questions
      const primaryQuest = answer;
      // console.log(answer.primaryChoice);
      // console.log(typeof answer.primaryChoice);
      if (answer.primaryChoice === "View All Employees") {
        // console.log("View All Employees");
        viewAll();
      } else if (answer.primaryChoice === "View All Employees By Department") {
        // console.log("View All Employees By Department");
        viewByDept();
      } else if (answer.primaryChoice === "View All Employees By Manager") {
        // console.log("View All Employees By Manager");
        viewByMgr();
      } else if (answer.primaryChoice === "Add Employee") {
        // console.log("Add Employee");
        addEmp();
      } else if (answer.primaryChoice === "Remove Employee") {
        // console.log("Remove Employee");
        removeEmp();
      } else if (answer.primaryChoice === "Update Employee Role") {
        // console.log("Update Employee Role");
        updateRole();
      } else if (answer.primaryChoice === "Update Employee Manager") {
        // console.log("Update Employee Manager");
        updateMgr();
      } else if (answer.primaryChoice === "View All Roles") {
        // console.log("View All Roles");
        viewRoles();
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
  let allEmp =
    "SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name, role.salary, employees.manager_id FROM employees INNER JOIN role ON employees.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY employees.last_name;";
  connection.query(allEmp, function (err, res) {
    if (err) throw err;
    // console.log({ res });
    console.table(res);
    inquirer
      .prompt({
        name: "continue",
        type: "confirm",
        message: "Would you like to continue?",
      })
      .then(function (answer) {
        if (answer.continue) {
          start();
        } else {
          connection.end();
        }
      });
  });
}
// View All Employees By Department
function viewByDept() {
  console.log("All Employees By Department: ");
  var empDept =
    "SELECT department.name, employees.first_name, employees.last_name, employees.id, role.title, role.salary, employees.manager_id FROM employees INNER JOIN role ON employees.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY department.name;";
  connection.query(empDept, function (err, res) {
    if (err) throw err;
    // console.log(res);
    console.table(res);
    inquirer
      .prompt({
        name: "continue",
        type: "confirm",
        message: "Would you like to continue?",
      })
      .then(function (answer) {
        if (answer.continue) {
          start();
        } else {
          connection.end();
        }
      });
  });
}
// View All Employees By Manager
function viewByMgr() {
  console.log("View All Employees By Manager");
  var empMgr =
    "SELECT employees.manager_id, employees.first_name, employees.last_name, employees.id, role.title, department.name, role.salary FROM employees INNER JOIN role ON employees.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY employees.manager_id;";
  connection.query(empMgr, function (err, res) {
    if (err) throw err;
    // console.log({ res });
    console.table(res);
    inquirer
      .prompt({
        name: "continue",
        type: "confirm",
        message: "Would you like to continue?",
      })
      .then(function (answer) {
        if (answer.continue) {
          start();
        } else {
          connection.end();
        }
      });
  });
}
// first_name, last_name, role_id, manager_id
function addEmp() {
  console.log("Add Employee");
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the employee's role id?",
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is the employee's manager's id?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: answer.role_id || 0,
          manager_id: answer.manager_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee added");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}
// Remove Employees
function removeEmp() {
  console.log("Remove Employee");
  selectRemove =
    "SELECT id, CONCAT(first_name, ' ', last_name) AS Employee FROM employees";
  connection.query(selectRemove, function (err, res) {
    if (err) throw err;
    console.table(res);
  });
  console.log("Enter employee id number");
  inquirer
    .prompt({
      name: "idNum",
      type: "input",
      message: "Enter employee id number",
    })
    .then(function (answer) {
      connection
        .query("DELETE FROM employees WHERE id=" + idNum + ";", function (
          err,
          results
        ) {
          if (err) throw err;
        })
        .prompt({
          name: "continue",
          type: "confirm",
          message: "Would you like to continue?",
        })
        .then(function (answer) {
          if (answer.continue) {
            start();
          } else {
            connection.end();
          }
        });

      if (answer.continue) {
        start();
      } else {
        connection.end();
      }
    });
}
// Update Employee Role
function updateRole() {
  console.log("Update Employee Role");
  connection.query(
    "SELECT CONCAT(first_name, ' ', last_name) AS Employee FROM employees",
    function (err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function () {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].Employee);
              }
              return choiceArray;
            },
            message: "What employee's role would you like to update?",
          },
        ])
        .then(function (answer) {
          // console.log(answer);
          console.log("Role update for: " + answer.choice);
          var roleQuery = "Select role_id, title from role";
          connection.query(roleQuery, function (err, res) {
            if (err) throw err;
            // console.log(res);
            console.table(res);
            console.log();
            /* inquirer.prompt([
              {
                name: "choice",
                type: "rawlist",
                choices: function () {
                  var choiceArray = [];
                  for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].title);
                  }
                  return choiceArray;
                },
                message: "What role should they have?",
              },
            ]).then;
            console.log("Employee;s role updated");
            start(); */
          });
        });
    }
  );
}

function updateMgr() {
  console.log("Update Employee Manager");
}

function viewRoles() {
  console.log("View All Roles");
  var allRoles =
    "SELECT role_id, title, salary,department_id FROM role ORDER BY role_id";
  connection.query(allRoles, function (err, res) {
    if (err) throw err;
    // console.log({ res });
    console.table(res);
    inquirer
      .prompt({
        name: "continue",
        type: "confirm",
        message: "Would you like to continue?",
      })
      .then(function (answer) {
        if (answer.continue) {
          start();
        } else {
          connection.end();
        }
      });
  });
}
