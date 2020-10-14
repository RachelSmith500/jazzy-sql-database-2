const express = require('express');
const router = express.Router();
const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: '',
    host: 'localhost',
    port: 5432, // the port for your database, (this is default for postgress)
    max: 10,//how many connections (quires) at one time 
    idleTimeoutMillis: 30000// 30 seconds try to connect - otherwise cancel 
});

pool.on('connect', () => {
    console.log ("Postgresql Connected");
});

pool.on('error', (error) => {
    console.log("error with postgress pool", error);
});


// static content. this will be replaced with a database table
const songListArray = [
    {
        title: 'Take Five',
        length: '2:55',
        date_released: '1959-09-29'
    },
    {
        title: 'So What',
        length: '9:22',
        date_released: '1959-08-17'
    }
];

router.get('/', (req, res) => {
    let queryText ='SELECT * FROM "songs";'
    pool.query(queryText).then((result)=>{
        console.log(`In /songs GET`, result.rows);
        res.send(result.rows);
    });
});

router.post('/', (req, res) => {
    
    res.sendStatus(201);
});

module.exports = router;