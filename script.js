var previousCities = [];
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");
var mainForecastEl = document.querySelector("#main-forecast");
var dailyForecastEl = document.querySelector("#daily-forecast");
var searchButtonEl = document.querySelector("btn");


var formSubmit = function(event) {
    // prevent page from reloading
    event.preventDefault();
    // get value from input form
    var cityName = cityInputEl.value.trim();
    console.log(cityName);

    if (cityName) {
        getWeather(cityName);
        // clear old content
        mainForecastEl.textContent="";
        cityInputEl.value="";
    } else {
        alert("Please enter a city");
    }
    previousSearch()
};

// add searched city to localStorage 
var previousSearch = function() {
    localStorage.setItem("previousCities", JSON.stringify(previousCities));
};

var getWeather = function(cityName) {
    var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=4aa8b0f77c886819d2b920f429db711e";

    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          displayWeather(data, cityName);
        });
        }
    });
};

getWeather();
// function for search button
    // event listener for click

    // displays in id="main-forecast"

    // diplays 5-day in id="daily-forecast"

// stores previous searches in id="previous city" using localStorage
searchButtonEl.addEventListener("click", formSubmit);