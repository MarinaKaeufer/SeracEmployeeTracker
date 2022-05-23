const mysql = require('mysql2');
const inquirer = require('inquirer');



let connection;
let pool;

async function establishConnections(){
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'employees'
      });     
    
    pool = mysql.createPool({
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'employees'
    }); 
    
}

establishConnections();

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
            const result = await connection.execute('SELECT * FROM employees');
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
    
                    const update_result = await connection.query(sql);
                    console.log("Success..." + update_result);
        }
        else if(answers.employee_choices === 'View All Roles'){
            rolesQuery = () =>{
                return new Promise((resolve, reject)=>{
                    pool.query('SELECT * FROM roles',  (error, results)=>{
                        if(error){
                            return reject(error);
                        }
                        return resolve(results);
                    });
                });
            };

            try {
                const roles = await rolesQuery();
                console.table(roles);
            } catch(err){
                console.log('Error ' + err);
            }
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
            deptsQuery = () =>{
                return new Promise((resolve, reject)=>{
                    pool.query('SELECT * FROM departments',  (error, results)=>{
                        if(error){
                            return reject(error);
                        }
                        return resolve(results);
                    });
                });
            };

            try {
                const roles = await deptsQuery();
                console.table(roles);
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
