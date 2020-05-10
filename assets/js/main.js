

/*The functions that create the moment and tie it to a div on the html is called 
here so it renders onto the webpage as soon as it loads*/

currentDay();

currentHour();


/* Initialize var to rename later in the event listener */
var userLocation;

/*This is an event listener for the search btn, it takes the value in the search input and does two things.
One, it prints it to the webpage for the user and two, it sets a variable to it (initialized in global scope) to be used be
concatenated into the url for openweathermap api*/

$("#search").on("click", function(e){

/*prevents the document from doing what it usually does, prevents it from refreshing. Want to do this because want to use the value the 
button will be grabbing from the search input to use in the first ajax call*/
    e.preventDefault();

/*Empties the two divs for current day's weather and 7 day forecast weather so that when another value is entered into the input and the button is pressed
it won't add a new set of divs on top of the old ones*/
    $("#nest").empty();
    $(".forecast").empty();
    

/*sets the variable, that was initialized in global scope, to the value that was entered into the input search.
this value is then concantenated into the url used for the first ajax call*/
    userLocation = $("#location").val();
    

    /*grabs the id of the span element located under a div with a class of city,
    it grabs the id in order to add the user Input from the search bar to the webpage
    */
    $("#weatherLocation").text(userLocation)

    
    
    /* declares the apikey to be used in the url for the first ajax call */
    var APIKey = "adcd424f400eb6c61768801157796f11";

    /* the url to be used in the first ajax call */
    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q="
    + userLocation + "&appid=" + APIKey;
    
    /* the first ajax call, the coordinates, longitude and langitude, are taken from this response and concantenated into the url for the second ajax call (for the seven day forecast) */
    $.ajax({
        url: queryURLCurrent,
        method: "GET"
    }).then(function(response){
        console.log(response);
    
        /* variables to hold the response for the coordinates longitude and langitude */
        var lon = response.coord.lon
        var lat = response.coord.lat 
        
    
        /*All var with response... are holding a response for the associated temperature, except weather, which is holding the current sky conditions*/


        /*holds the response for the feels_like temperature*/
        var feelsLike = response.main.feels_like;

        /*turns the response for feels_like into farenheit*/
        var feelsLikeF = (feelsLike - 273.15) * 1.80 + 32;
    
        /*Creates a variable that will be appended later to represent
        a newly created div, with an class of feels for styling anchor, that
        prints the rounded temp number to nestle under nest div for current weather*/
        var fLF = $('<div>').addClass("feels").text("Feels Like: " + feelsLikeF.toFixed(0));
      
    
        var currentTemp = (response.main.temp - 273.15) * 1.80 + 32;;
       
    
        var cTF = $('<div>').addClass("current").text("Temperature (F): " + currentTemp.toFixed(0));
    
        var tempMax = (response.main.temp_max - 273.15) * 1.80 + 32;
        
    
        var tMF = $('<div>').addClass("max").text("High: " + tempMax.toFixed(0));
        
        var tempMin = (response.main.temp_min - 273.15) * 1.80 + 32;
    

        var tMinF = $('<div>').addClass("min").text("Low: " + tempMin.toFixed(0));
        
        var weather = response.weather[0].main;



        var w = $('<div>').addClass("w").text(weather);

        /*concatenates the response with the url for the icon .png and is held in a variable*/

        var iconCurrent = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";

        /*new element of img is created with an attribute of src to hold the url picture for the icon (that changes based on the weather conditions)*/
        var iC = $("<img>").attr("src", iconCurrent);
    

        /*appends all variables that were created with a class and text are appended to the parent div with a id of nest*/
        $("#nest").append(iC, w, cTF, fLF, tMF, tMinF)

        
        /*var for url key in ajax call, uses the same APIKey as used by current weather.
        lat and lon are taken from the response of current weather for the city entered (in the search input)*/
        var queryURLSeven = "https://api.openweathermap.org/data/2.5/onecall?lat="
        + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + APIKey;

        $.ajax({
            url: queryURLSeven,
            method: "GET"
        }).then(function(response){
            console.log(response);


            /*holds the response for daily weather*/
            var daily = response.daily;
            

            /*for loop to loop through the array of daily. everytime it loops six variables are created to hold the temp, weather conditions, and icon image.
            these are then used to create new divs, and an img element where classes are added and text added. These are then appended to each card (seven in total) everytime
            the for loop loops*/
            for (var i = 0; i < (daily.length - 1); i++){
                var tempDay = (daily[i].temp.day - 273) * 1.80 + 32;
                
                var tempEve = (daily[i].temp.eve - 273) * 1.80 + 32;
                var tempMax = (daily[i].temp.max - 273) * 1.80 + 32;
                var tempMin = (daily[i].temp.min - 273) * 1.80 + 32;
                var dayWeather = daily[i].weather[0].main;

                var iconDaily = "https://openweathermap.org/img/w/" + daily[i].weather[0].icon + ".png";



               var tD = $("<div>").addClass("d").text("Daytime (F): " + tempDay.toFixed(0)); 
               var tE = $("<div>").addClass("eve").text("Evening: " + tempEve.toFixed(0));
               var tMax = $("<div>").addClass("dayMax").text("Max: " + tempMax.toFixed(0));
               var tMin = $("<div>").addClass("dayMin").text("Min: " + tempMin.toFixed(0));
               var dW = $("<div>").addClass("dayweather").text(dayWeather);

               var iC = $("<img>").attr("src", iconDaily);

                $("#" + [i]).append(iC, dW, tD, tE, tMax, tMin);


            }
            

        });
        
        
    });

    
});

/* initializing the vars for moment library */
var mDay;
var mHour;

/*functions that are to be called right when the page loads. One creates a variable to hold the moment for day and adds it to the webpage via the id and the other
also creates a variable to hold the moment for the hour and adds it to the webpage via the id.*/
function currentDay(){
    var mDay = moment().format("LL");

    $("#currentDay").html(mDay);
};

function currentHour(){
    
    var mHour = moment().format("LT");

    $("#currentHour").html(mHour);

};
