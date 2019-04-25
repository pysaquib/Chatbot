var express = require('express');                                       // imports express module
var fs = require('fs');                                                 // imports fs module
var app = express();                                                    // creating instance of express() class

app.use(express.json());                                             


var sunSign = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];     
var dateObj = new Date();                                               // getting current date and storing in dateObj
var month = dateObj.getUTCMonth();                                      // getting current month from dateObj
var date = dateObj.getUTCDate();                                        // getting current date from dateObj
var year = dateObj.getUTCFullYear(); 

const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var todaysDate = monthList[month] + " " + date + ", "+year;             // creating date format similar to that of our json file 
console.log(todaysDate);
var data_1 = fs.readFileSync('allHoroscope.json');                      // reading 'allHoroscope.json' file and storing the string data in 'data_1'
var horoscopeData = JSON.parse(data_1);                                 // parsing string data of 'data_1' into JS object

var data_2 = fs.readFileSync('dailyHoroscope.json');                    // reading 'dailyHoroscope.json' file and storing the string data in 'data_2'
var dailyHoroscopeData = JSON.parse(data_2);                            // parsing string data of 'data_2' into JS object


app.get('/horoscope/:sunSign', (req,res) =>{                            // GET method endpoint to get daily horoscope

    var count = 0;
    for(var i = 0; i<horoscopeData.length; i++){                        // iterating loop over horoscopeData 
        if(horoscopeData[i][0]['Date'] == todaysDate){                  // incrementing 'count' when 'date' in horoscopeData matches today's date
            count++;
        }
    }
    if(count == 0){                                                     // if count is 0
        horoscopeData.push(dailyHoroscopeData);                         // push data in 'horoscopeData' object
        fs.writeFileSync('allHoroscope.json', JSON.stringify(horoscopeData, null, 2));      // write 'horoscopeData' in 'allHoroscope.json' file
        console.log("Success")
    }

    var sign = req.params.sunSign;
    for(let i =0; i<dailyHoroscopeData.length; i++){
        if(sign == dailyHoroscopeData[i]["Sign"] && todaysDate == dailyHoroscopeData[i]["Date"]){
            // console.log(dailyHoroscopeData[i]["Prediction"]);
            return res.send(dailyHoroscopeData[i]["Prediction"]);
        }
    }
    return res.send({errorMsg : "Sorry!! You have entered wrong sun sign :( "});
});

var data = fs.readFileSync('jokes.json');
var jokesObj = JSON.parse(data);

var randomJoke = (min, max) => {
    var randomNumber = (Math.floor(Math.random() * (max - min) + min));
    return randomNumber;
}

app.get('/jokes', (req, res) => {
    const email = req.query.email;
    var randomNumber = randomJoke(1, jokesObj.length);
    for(let i = 0; i < jokesObj.length; i++){
        if(randomNumber == (i+1)){
            res.send(jokesObj[i][String(i+1)])
        }
    }
});


app.listen('3000');