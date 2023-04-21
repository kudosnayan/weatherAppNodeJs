const express = require('express');
const https = require('http')
const fs = require('fs')
var routes = require('./src/routes/route');
const app = express()

const port = process.env.PORT || 3000;
app.use(express.json())
app.use(routes);
app.use(express.static('public'));
app.use(express.static('views'));

// const homeFile = fs.readFileSync(__dirname+'/views/index.html','utf-8')

app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})