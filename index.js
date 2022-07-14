const table = require('console.table')
const inquirer = require('inquirer')
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeecms_db'
    }
);

db.connect((err) => {
    if (err) throw err;
    init()
})

function init() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: [
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'View All Employees',
                'Quit'
            ]
        }
    ])
    .then(ans => {
        switch (ans.mainMenu) {
            case 'Add Employee':
                addEmpl();
                break;
            case 'Update Employee Role':
                console.log('whoops redo')
                break;
            case 'View All Roles':
                console.log('whoops redo')
                break;
            case 'Add Role':
                addRoles();
                break;
            case 'View All Departments':
                    console.log('whoops redo')
                    break;
            case 'Add Department':
                addDepartment();
                break;
            case 'View All Employees':
                console.log('whoops redo')
                break;
            case 'Quit':
                console.log('Goodbye')
                db.end()
                break;
        }
        
    })
}

//add dept
function addDepartment() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'What is the name of the department?',
            validate: (ans) => {
                if(ans !== '') {
                    return true;
                } else {
                    console.error('The department name cannot be blank');
                    return false;
                };
            }
        }
    ])
    .then(ans => {
        db.query(`INSERT INTO department (dept_name) VALUES ("${ans.addDept}");`, (err, res) => {
            if(err) throw err;
        })
        db.query('SELECT * FROM department', (err, res) => {
            console.table(res)
            init()
        })
    })
};

//add roles
function addRoles() {
    let deptArr = []
    db.query('SELECT * FROM department', (err, res) => {
        res.forEach(dep => {
            deptArr.push(dep.dept_name)
        })
    })
    
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'addRole',
            message: 'What is the name of the role?',
            validate: (ans) => {
                if(ans !== '') {
                    return true;
                } else {
                    console.error('The role name cannot be blank');
                    return false;
                };
            }
        },
        {
            type: 'input',
            name: 'roleSal',
            message: 'What is the salary of the role?',
            validate: (ans) => {
                if(ans !== '') {
                    return true;
                } else {
                    console.error('The salary cannot be blank');
                    return false;
                };
            }
        },
        {
            type: 'list',
            name: 'roleDept',
            message: 'Which department does the role belong to?',
            choices: deptArr
        }
    ])
    .then(ans => {
        db.query(`INSERT INTO roles (title, salary, dept_id) VALUES ("${ans.addRole}", ${parseFloat(ans.roleSal)}, ${deptArr.indexOf(ans.roleDept)+1});`)
        db.query('SELECT * FROM roles', (err, res) => {
            console.table(res)
            init()
        })
    })
}

//add employee
function addEmpl() {
    let roleArr = []
    db.query('SELECT * FROM roles', (err, res) => {
        res.forEach(role => {
            roleArr.push(role.title)
        })
    })

    let mngArr = []
    db.query('SELECT * FROM employee', (err, res) => {
        res.forEach(employee => {
            mngArr.push(`${employee.first_name} ${employee.last_name}`)
        })
    })

    inquirer
    .prompt([
        {
            type: 'input',
            name: 'fName',
            message: "What is the employee's first name?",
            validate: (ans) => {
                if(ans !== '') {
                    return true;
                } else {
                    console.error('Their first name cannot be blank');
                    return false;
                };
            }
        },
        {
            type: 'input',
            name: 'lName',
            message: "What is the employee's last name?",
            validate: (ans) => {
                if(ans !== '') {
                    return true;
                } else {
                    console.error('Their last name cannot be blank');
                    return false;
                };
            }
        },
        {
            type: 'list',
            name: 'emplRole',
            message: "What is the employee's role?",
            choices: roleArr
        },
        {
            type: 'list',
            name: 'emplSup',
            message: "Who is the employee's manager?",
            choices: mngArr
        }
    ])
    .then(ans => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${ans.fName}", "${ans.lName}", "${roleArr.indexOf(ans.emplRole)+1}", "${mngArr.indexOf(ans.emplSup)+1}")`)
        db.query(`SELECT * FROM employee`, (err, res) => {
            console.table(res)
            init()
        })
    })
}