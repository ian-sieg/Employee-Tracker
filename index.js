const inquirer = require('inquirer');
const mysql = require('mysql2');
const dotenv = require('dotenv')
const {menuQ, addDept, addRole, addEmpl, updRole} = require('./questions/questions');

dotenv.config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);

function init() {
    inquirer
    .prompt(menuQ)
    .then((ans) => console.log(ans))
}

init()