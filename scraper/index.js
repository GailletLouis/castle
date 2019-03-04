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
    var outputarray = [];
    var outputjson = { name:"", hotel_url:"" };

    request(url, function(error, response, html){

        // Handle errors
        if(!error){
            // cheerio lab permits to have jQuery easily on the HTML
            var $ = cheerio.load(html);
            
            //filter to France        
            var data = $('#countryF').eq(1).find('li');

            data.each((i, element) =>
            {
            //filter to get URL
                hotel_url = $(element).find('a').eq(0).attr('href');
                console.log(hotel_url);

                name = $(element).find('a').eq(0).text();
                console.log(name);
                
                outputarray.push({name: name, url:hotel_url});
            });
        }

        //if there is an error
        else{
            console.log('error when requesting website');
        }

        //Save the results (array) into output.json file
        fs.writeFile('output.json', JSON.stringify(outputarray, null, 4), function(err){
            console.log('File saved as output.json');
        });
    });
});

app.listen('8081');

console.log('Go to http://localhost:8081/scrape on your browser');
console.log('a Json file named output.json should appear')

exports = module.exports = app;