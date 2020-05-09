
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
    
    


});

        

//var city = "San Francisco,us"

var lat = 37.77;

var lon = -122.42;


var queryURLSeven = "https://api.openweathermap.org/data/2.5/onecall?lat="
 + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + APIKey;

$.ajax({
    url: queryURLSeven,
    method: "GET"
}).then(function(response){
    console.log(response);




})


//when they click into the search bar, a little pop appears to say 
//how to type it in "no spaces a comma inbetween, except when the
// city is more than one word" --- davis,california or san francisco,california