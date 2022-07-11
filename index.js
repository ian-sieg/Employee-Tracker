const table = require('console.table')
const inquirer = require('inquirer')
const mysql = require('mysql2');
const {menuQ, addDept} = require('./questions/questions');
const {addDepartment} = require('./helpers/helpers')

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
    function init() {
        inquirer
        .prompt(menuQ)
        .then(ans => {
            switch (ans.mainMenu) {
                case 'Add Employee':
                    console.log('added employee duh')
                    break;
                case 'Update Employee Role':
                    console.log('whoops redo')
                    break;
                case 'View All Roles':
                    console.log('whoops redo')
                    break;
                case 'Add Role':
                    console.log('whoops redo')
                    break;
                case 'View All Departments':
                        console.log('whoops redo')
                        break;
                case 'Add Department':
                    inquirer
                    .prompt(addDept)
                    .then(ans => {
                        addDepartment(ans);
                    })
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
    init()
})