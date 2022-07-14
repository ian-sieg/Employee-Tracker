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
                updRole();
                break;
            case 'View All Roles':
                allRole();
                break;
            case 'Add Role':
                addRoles();
                break;
            case 'View All Departments':
                allDept();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'View All Employees':
                allEmp();
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
};

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
        res.forEach(emp => {
            mngArr.push(`${emp.first_name} ${emp.last_name}`)
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
};

//update empl role
function updRole() {
    let roleArr = []
    db.query('SELECT * FROM roles', (err, res) => {
        res.forEach(role => {
            roleArr.push(role.title)
        })
    })

    let empArr = []
    db.query('SELECT * FROM employee', (err, res) => {
        res.forEach(emp => {
            empArr.push(`${emp.first_name} ${emp.last_name}`)
        })
    })

    inquirer
    .prompt([
        {
            type: 'list',
            name: 'updEmpRole',
            message: "Which employee's role do you want to update?",
            choices: empArr
        },
        {
            type: 'list',
            name: 'newRole',
            message: "Which role do you want to assign the selected employee?",
            choices: roleArr
        },
    ])
    .then(ans => {
        db.query(`UPDATE employee SET role_id = ${roleArr.indexOf(ans.newRole)+1} WHERE id = ${empArr.indexOf(ans.updEmpRole)+1}`)
        db.query('SELECT * FROM employee', (err, res) => {
            console.table(res)
            init()
        })
    })
};

//view all roles
function allRole() {
    db.query(`SELECT * FROM roles`, (err, res) => {
        console.table(res)
        init()
    })
}

//view all departments
function allDept() {
    db.query(`SELECT * FROM department`, (err, res) => {
        console.table(res)
        init()
    })
}

//view all employees
function allEmp() {
    db.query(`SELECT * FROM employee`, (err, res) => {
        console.table(res)
        init()
    })
}