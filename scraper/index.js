var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();


app.get('/scrape', function(req, res){

    //url of the website we scrape, on this one we have all the needed urls of each hotel
    url = "https://www.relaischateaux.com/fr/site-map/etablissements";

    request(url, function(error, response, html){

        // Handle errors
        if(!error){
            // cheerio lab permits to have jQuery easily on the HTML
            var $ = cheerio.load(html);
            
            //list of the urls we want to get
            var url;
            var json = { url };
        }
    })
})

app.listen('8081')

console.log('Test port 8081');

exports = module.exports = app;