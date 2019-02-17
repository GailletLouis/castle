var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();


app.get('/scrape', function(req, res){

    //url of the website we scrape, on this one we have all the needed urls of each hotel
    url = "https://www.relaischateaux.com/fr/site-map/etablissements";

    //list of the urls we want to get
    var hotel_url;
    var name; // name of the hotel 
    var outputjson = { name, hotel_url };
    
    request(url, function(error, response, html){

        // Handle errors
        if(!error){
            // cheerio lab permits to have jQuery easily on the HTML
            var $ = cheerio.load(html);
            


            //filter to France
            $('.France').filter(function(){
                     var data = $(this);
            });
            
            //filter to li section
            $('.li').filter(function(){
                var data = $(this);
                hotel_url = data.children().first().text();
                outputjson.hotel_url = hotel_url;
            });
        }

        //if there is an error
        else{
            console.log('error when requesting website');
        }
    });

    //Save the json results in output.json file
    fs.writeFile('output.json', JSON.stringify(outputjson, null, 4), function(err){
        console.log('File saved as output.json');
    });
});

app.listen('8081');

console.log('Go to http://localhost:8081/scrape on your browser');

exports = module.exports = app;