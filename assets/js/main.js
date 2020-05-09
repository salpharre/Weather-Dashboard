
//var userLocation = $("#location").val(); ---so it's global
//initialize var userLocation;
/*
$("#search").on("click", function(e){


    e.preventDefault();

    
    //refer to the global var userLocation

    var userLocation = $("#location").val();//value is inserted into city for queryURLCurrent
    console.log(userLocation);

    //save val() to localstorage
    //wishlist: have value in search show up as an option when click into search bar

    // put both ajaxes inside here

    var APIKey = "adcd424f400eb6c61768801157796f11";

    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q="
    + userLocation + "&appid=" + APIKey;
    
    $.ajax({
        url: queryURLCurrent,
        method: "GET"
    }).then(function(response){
        console.log(response);
    
        //target the div #todayCard
        //and add divs to it to show current weather
        
    
    });



    
})
*/

//checking to see if ajax works and what to grab 


//call current weather first, it spits out longitude and latitude, grab those two and incert into lat and lon for onecall


//function renderForecast{} ---have both api calls in the same one, current weather first and then 7 day

var test = "Davis,California"


var APIKey = "adcd424f400eb6c61768801157796f11";

var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q="
+ test + "&appid=" + APIKey;

$.ajax({
    url: queryURLCurrent,
    method: "GET"
}).then(function(response){
    console.log(response);

    //target the div #todayCard
    //and add divs to it to show current weather
    
    //for onecall ajax call
    var lon = response.coord.lon
    var lat = response.coord.lat 

    //console.log(lon);
    //console.log(lat);

    var feelsLike = response.main.feels_like;
    var feelsLikeF = (feelsLike - 273.15) * 1.80 + 32;
    //console.log(feelsLike);
    //console.log(feelsLikeF);
    //use .toFixed(0) to have Farenheit rounded to a whole number

    var currentTemp = (response.main.temp - 273.15) * 1.80 + 32;;
    //var currentTempF = 
    console.log(currentTemp);
    // console.log(currentTempF);

    var tempMax = (response.main.temp_max - 273.15) * 1.80 + 32;
    console.log(tempMax);
    
    var tempMin = (response.main.temp_min - 273.15) * 1.80 + 32;
    console.log(tempMin);
    
    
    var weather = response.weather[0].description;
    //var weatherIcon = response.weather[0].icon;
    console.log(weather);
    //console.log(weatherIcon);



});

        
/*
//var city = "San Francisco,us"

var lat = ["37.77"];

var lon = ["-122.42"];


var queryURLSeven = "https://api.openweathermap.org/data/2.5/onecall?lat="
 + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + APIKey;

$.ajax({
    url: queryURLSeven,
    method: "GET"
}).then(function(response){
    console.log(response);

    var daily = response.daily;
    //console.log(daily);

    var tempDay;
    var tempEve;
    var tempMax;
    var tempMin;
    var weather;

    for (var i = 0; i < daily.length; i++){
        var tempDay = (daily[i].temp.day - 273) * 1.80 + 32;
        //make div and append
        var tempEve = (daily[i].temp.eve - 273) * 1.80 + 32;
        var tempMax = (daily[i].temp.eve - 273) * 1.80 + 32;
        var tempMin = (daily[i].temp.eve - 273) * 1.80 + 32;
        var weather = daily[i].weather[0].description;



    console.log(tempDay);
    console.log(tempEve);
    console.log(tempMax);
    console.log(tempMin);
    console.log(weather);

    }
    

})
*/

//when they click into the search bar, a little pop appears to say 
//how to type it in "no spaces a comma inbetween, except when the
// city is more than one word" --- davis,california or san francisco,california