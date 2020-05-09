
//var userLocation = $("#location").val(); ---so it's global
//initialize var userLocation;
//localStorage.clear();

var userLocation;
var valueToday;

//$("#weatherLocation").val(JSON.parse(localStorage.getItem("location")));

//$("")

$("#search").on("click", function(e){


    e.preventDefault();

    // $("#todayCard").empty();
    // $(".row").empty();
    
    //refer to the global var userLocation

    var userLocation = $("#location").val();//value is inserted into city for queryURLCurrent
    //console.log(userLocation);

    /*grabs the id of the span element located under div with an id of todayCard,
    it grabs the id in order to add the user Input from the search bar to the webpage
    */
    $("#weatherLocation").text(userLocation)


    // var storeWeather = $("#weatherLocation").val();
    // console.log(storeWeather);
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
        
        //for onecall ajax call
        var lon = response.coord.lon
        var lat = response.coord.lat 
    
        //console.log(lon);
        //console.log(lat);
        
    
    
        var feelsLike = response.main.feels_like;
        var feelsLikeF = (feelsLike - 273.15) * 1.80 + 32;
    
        /*Creates a variable that will be appended later to represent
        a newly created div, with an id of feels for styling anchor, that
        prints the rounded temp number to nestle under card-body div for current weather*/
        var fLF = $('<div id="feels"></div>').text("Feels Like: " + feelsLikeF.toFixed(0));
        //console.log(feelsLike);
        //console.log(feelsLikeF);
        //use .toFixed(0) to have Farenheit rounded to a whole number
    
        var currentTemp = (response.main.temp - 273.15) * 1.80 + 32;;
        //var currentTempF = 
        //console.log(currentTemp);
        // console.log(currentTempF);
    
        var cTF = $('<div id="current"></div>').text("Temperature (F): " + currentTemp.toFixed(0));
    
        var tempMax = (response.main.temp_max - 273.15) * 1.80 + 32;
        //console.log(tempMax);
    
        var tMF = $('<div id="max"></div>').text("High: " + tempMax.toFixed(0));
        
        var tempMin = (response.main.temp_min - 273.15) * 1.80 + 32;
        //console.log(tempMin);
        var tMinF = $('<div id="min"></div>').text("Low: " + tempMin.toFixed(0));
        
        var weather = response.weather[0].description;
        //var weatherIcon = response.weather[0].icon;
        //console.log(weather);
        //console.log(weatherIcon);
    
        var w = $('<div id="w"></div>').text(weather);
    
        $("#nest").append(w, cTF, fLF, tMF, tMinF)
    
        

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
            

        });
        
    });

    
    // JSON.stringify(localStorage.setItem("location", userLocation));
    
    // var valueToday = $("div#w").val();
    // console.log(valueToday)

    // JSON.stringify(localStorage.setItem("jumbo", valueToday));
    
})


//checking to see if ajax works and what to grab 


//call current weather first, it spits out longitude and latitude, grab those two and incert into lat and lon for onecall


//function renderForecast{} ---have both api calls in the same one, current weather first and then 7 day

//var test = "Davis,California"




        

//var city = "San Francisco,us"

var lat = ["37.77"];

var lon = ["-122.42"];





//when they click into the search bar, a little pop appears to say 
//how to type it in "no spaces a comma inbetween, except when the
// city is more than one word" --- davis,california or san francisco,california