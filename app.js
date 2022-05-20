const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'employees'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

inquirer
  .prompt([
    {
      type: 'list',
      name: 'employee_choices',
      message: 'What would you like to do?',
      choices: ['Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
    },
  ])
  .then(answers => {
    console.info('Answer:', answers.employee_choices);

    if(answers.employee_choices === 'Add Employee') {
        inquirer
            .prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "What is employee's first name?",
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "What is employee's last name?",
                },
            ])
            .then((answer) => {
                console.log("Employee first name and last name: ", answer.first_name, answer.last_name);
                const sql = `INSERT INTO employees (first_name, last_name) 
                   VALUES (?,?)`;
                    const params = [answer.first_name, answer.last_name];

                connection.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Success..." + result);
                });
            });
    }
    else if(answers.employee_choices === 'Update Employee Role'){

    }
    else if(answers.employee_choices === 'View All Roles'){
        connection.query('SELECT * FROM roles', (err, result) => {
            if (err) {
                console.log(err);
            }
            console.table(result);
        });
    }
    else if(answers.employee_choices === 'Add Role'){
        
    }
    else if (answers.employee_choices === 'View All Departments'){
        connection.query('SELECT * FROM departments', (err, result) => {
            if (err) {
                console.log(err);
            }
            console.table(result);
        });
    }
    else if (answers.employee_choices === 'Add Department'){
        
    } else {

    }
  });
