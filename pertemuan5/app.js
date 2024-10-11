const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyparser.json());

const connection = mysql.createConnection({

})