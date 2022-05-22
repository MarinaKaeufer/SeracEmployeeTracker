// const mysql = require('mysql2');
const mysql = require('mysql2/promise');
const inquirer = require('inquirer');

let connection;

async function startConnection(){
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'employees'
      });     
}

startConnection();

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL Server!');
// });

start();

async function start(){
    let dontQuit = true;

    while(dontQuit){
        const answers = await inquirer
            .prompt([
            {
                type: 'list',
                name: 'employee_choices',
                message: 'What would you like to do?',
                choices: ['Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
            },
            ])
            console.info('Answer:', answers.employee_choices);
    
        if(answers.employee_choices === 'Add Employee') {
            const answer = await inquirer
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
                
        }
        else if(answers.employee_choices === 'Update Employee Role'){
            connection.query('SELECT * FROM employees', async (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.table(result);
                const answer = await inquirer
                .prompt([
                    {
                        name: "employee_id",
                        type: "number",
                        message: "What is the ID of the employee you would like to update?",
                    },
                    {
                        name: "role_id",
                        type: "number",
                        message: "What is the ID of the role you would like to assign to this employee?",
                    },
                ])
                
                    console.log("Employee id name and role id: ", answer.employee_id, answer.role_id);
                    const sql = `UPDATE employees SET role_id = ${answer.role_id} 
                        WHERE id = ${answer.employee_id} `;
    
                    connection.query(sql, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log("Success..." + result);
                    });
            });
            
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
            const answer = await inquirer
                .prompt([
                    {
                        name: "role_title",
                        type: "input",
                        message: "What is roles's title?",
                    },
                    {
                        name: "role_salary",
                        type: "input",
                        message: "What is role's salary?",
                    }
                ])
                
                    console.log("Role title and salary: ", answer.role_title, answer.role_salary);
                    const sql = `INSERT INTO roles (job_title, salary) 
                        VALUES (?,?)`;
                        const params = [answer.role_title, answer.role_salary];
    
                    connection.query(sql, params, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log("Success..." + result);
                    });
        }
        else if (answers.employee_choices === 'View All Departments'){
            try {
                const result = await connection.execute('SELECT * FROM departments');
                console.table(result);
            } catch(err){
                console.log('Error ' + err);
            } 
        }
        else if (answers.employee_choices === 'Add Department'){
            const answer = await inquirer
                .prompt([
                    {
                        name: "dept_name",
                        type: "input",
                        message: "What is department's name?",
                    }
                ])
                
                    console.log("Department name: ", answer.dept_name);
                    const sql = `INSERT INTO departments (dept_name) 
                        VALUES (?)`;
                        const params = [answer.dept_name];
    
                    connection.query(sql, params, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log("Success..." + result);
                    });
        } else {
            dontQuit = false;
        }

    }

}
