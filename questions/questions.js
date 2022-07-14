const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeecms_db'
    }
);

const menuQ = {
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
    };


const addEmpl = [
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
        choices: [`${roles}`] //ADD ALL ROLES IN THE DATABASE HERE
    },
    {
        type: 'list',
        name: 'emplSup',
        message: "Who is the employee's manager?",
        choices: ['none',`${employees}`] //ADD ALL EMPLOYEES IN THE DATABASE HERE
    }
];

const updRole = [
    {
        type: 'list',
        name: 'updEmpRole',
        message: "Which employee's role do you want to update?",
        choices: [`${employees}`] //ADD ALL EMPLOYEES IN THE DATABASE HERE
    },
    {
        type: 'list',
        name: 'newRole',
        message: "Which role do you want to assign the selected employee?",
        choices: [`${roles}`] //ADD ALL ROLES IN THE DATABASE HERE
    },
]


// beautiful switch cases

// if (ans.mainMenu === 'Add Employee') {
//     console.log('added employee')
// } else if (ans.mainMenu === 'Update Employee Role') {
//     console.log('updated role')
// } else if (ans.mainMenu === 'View All Roles') {
//     console.log('viewed all role')
// } else if (ans.mainMenu === 'Add Role') {
//     addRoles()
// } else if (ans.mainMenu === 'View All Departments') {
//     console.log('viewed all dept')
// } else if (ans.mainMenu === 'Add Department') {
//     addDepartment()
// } else if (ans.mainMenu === 'View All Employees') {
//     console.log('Viewed all empl')
// } else if (ans.mainMenu === 'Quit') {
//     console.log('updated Goodbye')
//     db.end()
// }