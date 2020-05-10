

/**/

currentDay();

currentHour();

var userLocation;



$("#search").on("click", function(e){


    e.preventDefault();

    $("#nest").empty();
    $(".forecast").empty();
    


    var userLocation = $("#location").val();//value is inserted into city for queryURLCurrent
    

    /*grabs the id of the span element located under div with an id of todayCard,
    it grabs the id in order to add the user Input from the search bar to the webpage
    */
    $("#weatherLocation").text(userLocation)


    // var storeWeather = $("#weatherLocation").val();
    // console.log(storeWeather);
    
    
    // put both ajaxes inside here
    var APIKey = "adcd424f400eb6c61768801157796f11";

    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q="
    + userLocation + "&appid=" + APIKey;
    
    $.ajax({
        url: queryURLCurrent,
        method: "GET"
    }).then(function(response){
        console.log(response);
    
        
        var lon = response.coord.lon
        var lat = response.coord.lat 
        
    
    
        var feelsLike = response.main.feels_like;
        var feelsLikeF = (feelsLike - 273.15) * 1.80 + 32;
    
        /*Creates a variable that will be appended later to represent
        a newly created div, with an id of feels for styling anchor, that
        prints the rounded temp number to nestle under card-body div for current weather*/
        var fLF = $('<div id="feels"></div>').text("Feels Like: " + feelsLikeF.toFixed(0));
      
    
        var currentTemp = (response.main.temp - 273.15) * 1.80 + 32;;
       
    
        var cTF = $('<div id="current"></div>').text("Temperature (F): " + currentTemp.toFixed(0));
    
        var tempMax = (response.main.temp_max - 273.15) * 1.80 + 32;
        
    
        var tMF = $('<div id="max"></div>').text("High: " + tempMax.toFixed(0));
        
        var tempMin = (response.main.temp_min - 273.15) * 1.80 + 32;
    

        var tMinF = $('<div id="min"></div>').text("Low: " + tempMin.toFixed(0));
        
        var weather = response.weather[0].main;



        var w = $('<div id="w"></div>').text(weather);

        var iconCurrent = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        var iC = $("<img>").attr("src", iconCurrent);
    
        $("#nest").append(iC, w, cTF, fLF, tMF, tMinF)

        
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
            


            for (var i = 0; i < (daily.length - 1); i++){
                var tempDay = (daily[i].temp.day - 273) * 1.80 + 32;
                
                var tempEve = (daily[i].temp.eve - 273) * 1.80 + 32;
                var tempMax = (daily[i].temp.max - 273) * 1.80 + 32;
                var tempMin = (daily[i].temp.min - 273) * 1.80 + 32;
                var dayWeather = daily[i].weather[0].main;

                var iconDaily = "https://openweathermap.org/img/w/" + daily[i].weather[0].icon + ".png";



               var tD = $("<div id='day'></div>").text("Daytime (F): " + tempDay.toFixed(0)); 
               var tE = $("<div id='eve'></div>").text("Evening: " + tempEve.toFixed(0));
               var tMax = $("<div id='dayMax'></div>").text("Max: " + tempMax.toFixed(0));
               var tMin = $("<div id='dayMin'></div>").text("Min: " + tempMin.toFixed(0));
               var dW = $("<div id='dayweather'></div>").text(dayWeather);

               var iC = $("<img>").attr("src", iconDaily);

                $("#" + [i]).append(iC, dW, tD, tE, tMax, tMin);


            }
            

        });
        
        
    });

    
});

var mDay;
var mHour;


function currentDay(){
    var mDay = moment().format("LL");

    $("#currentDay").html(mDay);
};

function currentHour(){
    
    var mHour = moment().format("LT");

    $("#currentHour").html(mHour);

};