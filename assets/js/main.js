

/*
$("#search").on("click", function(e){


    e.preventDefault();

    

    var userLocation = $("#location").val();


    ///call the function that calls ajax and renders the weather

    //save val() to localstorage
    //wishlist: have value in search show up as an option when click into search bar
})
*/

//checking to see if ajax works and what to grab 

//function renderWeather{}

var APIKey = "adcd424f400eb6c61768801157796f11";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
"q=" +  + "&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);

    


})