
//var userLocation = $("#location").val(); ---so it's global
//initialize var userLocation;
//localStorage.clear();

var userLocation;
var valueToday;

// function getItem(){
//     $("#").val(localStorage.getItem("nest"));
// }


// $("#nest").val(localStorage.getItem("nest0"));
// $("#nest").val(localStorage.getItem("nest1"));
// $("#nest").val(localStorage.getItem("nest2"));
// $("#nest").val(localStorage.getItem("nest3"));
// $("#nest").val(localStorage.getItem("nest4"));

// $("#weatherLocation").val(localStorage.getItem("location"));
/*
$("#0").val(JSON.parse(localStorage.getItem("number")));
$("#1").val(JSON.parse(localStorage.getItem("number")));
$("#2").val(JSON.parse(localStorage.getItem("number")));
$("#3").val(JSON.parse(localStorage.getItem("number")));
$("#4").val(JSON.parse(localStorage.getItem("number")));
$("#5").val(JSON.parse(localStorage.getItem("number")));
$("#6").val(JSON.parse(localStorage.getItem("number")));
*/
$("#search").on("click", function(e){


    e.preventDefault();

    $("#nest").empty();
    $(".forecast").empty();
    
    //getItem();


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
        
        // if (weather === "clear sky"){
        //     $(".sky").attr("src", "../img/sunny.png");
        // } 
        // else if(weather === "broken clouds"){
        //     $(".sky").attr("src", "../img/partial.png");
        //  }
        //  else if(weather === "rain"){
        //      $(".sky").attr("src", "../img/rain.png");
        //  }
    
        var w = $('<div id="w"></div>').text(weather);
    
        $("#nest").append(w, cTF, fLF, tMF, tMinF)

        
        /*var for url key in ajax call, uses the same APIKey as used by current weather.
        lat and lon are taken from the response of current weather for the city entered*/
        var queryURLSeven = "https://api.openweathermap.org/data/2.5/onecall?lat="
        + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + APIKey;

        $.ajax({
            url: queryURLSeven,
            method: "GET"
        }).then(function(response){
            console.log(response);

            var daily = response.daily;
            //console.log(daily);

            // var tempDay;
            // var tempEve;
            // var tempMax;
            // var tempMin;
            // var weather;

            for (var i = 0; i < (daily.length - 1); i++){
                var tempDay = (daily[i].temp.day - 273) * 1.80 + 32;
                //make div and append
                var tempEve = (daily[i].temp.eve - 273) * 1.80 + 32;
                var tempMax = (daily[i].temp.max - 273) * 1.80 + 32;
                var tempMin = (daily[i].temp.min - 273) * 1.80 + 32;
                var dayWeather = daily[i].weather[0].description;

               var tD = $("<div id='day'></div>").text("Daytime: " + tempDay.toFixed(0)); 
               var tE = $("<div id='eve'></div>").text("Evening: " + tempEve.toFixed(0));
               var tMax = $("<div id='dayMax'></div>").text("Max: " + tempMax.toFixed(0));
               var tMin = $("<div id='dayMin'></div>").text("Min: " + tempMin.toFixed(0));
               var dW = $("<div id='dayweather'></div>").text("Weather: " + dayWeather);

                $("#" + [i]).append(dW, tD, tE, tMax, tMin);


                //var numberValue = $("#" + [i]).val("#day", "#eve", "#dayMax", "#dayMin", "#dayweather");

                //JSON.stringify(localStorage.setItem("number", numberValue))
            }
            

        });
        
        
    });

    
    // localStorage.setItem("location", userLocation);
    
    // var nestFeels = $("#feels").text();
    // var nestW = $("#w").text();
    // var nestCurrent = $("#current").text();
    // var nestMax = $("#max").text();
    // var nestMin = $("#min").text();

    // localStorage.setItem("nest0", nestFeels);
    // localStorage.setItem("nest1", nestW);
    // localStorage.setItem("nest2", nestCurrent);
    // localStorage.setItem("nest3", nestMax);
    // localStorage.setItem("nest4", nestMin);
    
});






// function setNestIds(){
    
// }





//var nest

    //trying to grab all the text in each div (with ids) that is nested under the div with id of nest
    //var nestValue = JSON.stringify($("#nest").html());
    //console.log(nestValue)

    //localStorage.setItem("nest", nestValue)

        



//when they click into the search bar, a little pop appears to say 
//how to type it in "no spaces a comma inbetween, except when the
// city is more than one word" --- davis,california or san francisco,california