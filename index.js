const table = require('console.table')
const inquirer = require('inquirer')
const mysql = require('mysql2')
const {menuQ, addDept} = require('./questions/questions');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeecsm_db'
    }
);

function init() {
    inquirer
    .prompt(menuQ)
    .then(ans => {
        console.log(ans.mainMenu)
    })
}

init()