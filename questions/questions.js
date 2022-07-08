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
            'Quit',
            'View All Employees'
        ]
    };

const addDept = {
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
};
//added ${addDept} to the database

const addRole = [
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
        choices: [`${departments}`] //ADD ALL DEPARTMENTS IN THE DATABASE HERE
    }
];
//Added &{role} to the database

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