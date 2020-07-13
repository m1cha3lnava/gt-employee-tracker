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
    start();
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
      const removeEE = "DELETE FROM employees WHERE id=" + answer.idNum;
      connection.query(removeEE, function (err, res) {
        if (err) throw err;
      });
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
  let allEmp =
    "SELECT id, first_name, last_name,role_id FROM employees ORDER BY id;";
  connection.query(allEmp, function (err, res) {
    if (err) throw err;
    // console.log({ res });
    // console.log("/n========================/n");
    console.table(res);
  });
  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "input",
        message: "What is the employee's id number?",
        /* validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }, */
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the new role's id number?",
        /*         validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
 */
      },
    ])
    .then(function (ans) {
      // console.log("emp " + ans.employee);
      // console.log("role " + ans.newRole);
      let updateQuery =
        "UPDATE employees SET role_id = " +
        ans.role_id +
        " WHERE id = " +
        ans.employee_id +
        ";";
      connection.query(updateQuery, function (err) {
        if (err) throw err;
        console.log("role updated");
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
    });
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
