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

    }
    else if(answers.employee_choices === 'Update Employee Role'){

    }
    else if(answers.employee_choices === 'View All Roles'){
        connection.query('SELECT * FROM roles', (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
    }
    else if(answers.employee_choices === 'Add Role'){
        
    }
    else if (answers.employee_choices === 'View All Departments'){
        
    }
    else if (answers.employee_choices === 'Add Department'){
        
    } else {

    }
  });
