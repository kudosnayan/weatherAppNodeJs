const express = require('express')
const router = new express.Router();
const https = require('http')
const streaming = require('streaming')
const fs = require('fs')
const requests = require('requests')

const replaceVal = (tempVal, OriginalVal) => {
        let temperature = tempVal.replace("{%tempval%}", OriginalVal.main.temp)
        temperature = temperature.replace("{%tempmin%}", OriginalVal.main.temp)
}
const homeFile = fs.readFileSync("views/index.html",'utf-8')
router.get('/', async (req, res) => {
        res.sendFile(__dirname)
        // console.log(res.sendFile(__dirname));
        requests('https://api.openweathermap.org/data/2.5/weather?q=ahmedabad&appid=80435b19495a5f85fc63dfef04ea7608', { streaming })
                .on('data', function (chunk) {
                        const objData = JSON.parse(chunk)
                        const arrData = [objData]
                        const realTimeData = arrData.map((val) => replaceVal(homeFile, val));
                        console.log(realTimeData);
                        res.write(realTimeData)
                })
                .on('end', function (err) {
                        if (err) return console.log('connection closed due to errors', err);
                        res.end();
                });
});

module.exports = router;
