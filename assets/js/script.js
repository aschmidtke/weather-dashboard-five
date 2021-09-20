var previousCities = [];
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");
var mainForecastEl = document.querySelector("#main-forecast");
var weatherSetsEl = document.querySelector("#weather-sets");
var dailyForecastEl = document.querySelector("#daily-forecast");
var searchButtonEl = document.querySelector("btn");


var formSubmit = function(event) {
    // prevent page from reloading
    event.preventDefault();
    // get value from input form
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getWeather(cityName);
        fiveDayForecast(cityName);
        // clear old content
        //mainForecastEl.textContent="";
        //cityInputEl.value="";
    } else {
        alert("Please enter a city");
    }
    getWeather()
    fiveDayForecast()
    previousSearch()
};

var getWeather = function(cityName) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=4aa8b0f77c886819d2b920f429db711e`;

    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
            displayWeather(data, cityName);
        });
        }
    });
};



var displayWeather = function(weather, cityName) {
    // clear content
    mainForecastEl.textContent = ""
    weatherSetsEl.textContent = ""

    mainForecastEl.textContent=cityName;
    mainForecastEl.classList = "text-center"



    var searchDate = document.createElement("h4")
    searchDate.textContent = " " + moment(weather.dt.value).format("MMMM Do, YYYY");
    mainForecastEl.appendChild(searchDate);
    
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    mainForecastEl.appendChild(weatherIcon);

    var currentTemp = document.createElement("span")
    currentTemp.textContent = "Temp = " + Math.floor(weather.main.temp) + "°";
    weatherSetsEl.appendChild(currentTemp);

    var currentFeels = document.createElement("span")
    currentFeels.textContent = "Feels Like: " + Math.floor(weather.main.feels_like) + "°";
    weatherSetsEl.appendChild(currentFeels);

    var currentHumidity = document.createElement("span")
    currentHumidity.textContent = "Humidity = " + weather.main.humidity + "%";
    weatherSetsEl.appendChild(currentHumidity);

    var currentWind = document.createElement("span")
    currentWind.textContent = "Wind Speed = " + Math.floor(weather.wind.speed) + " mph";
    weatherSetsEl.appendChild(currentWind);

    var longitude = weather.coord.lon;
    var lattitude = weather.coord.lat;
    currentUV(lattitude, longitude)
}


var currentUV = function(lattitude, longitude) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=4aa8b0f77c886819d2b920f429db711e&lat=${lattitude}&lon=${longitude}`
    fetch(apiUrl)
    .then(function(response) {
        response.json().then(function(data) {
            displayUV(data)
        });
    });
}

var displayUV = function (index) {
    var uvResultsEl = document.createElement("div");
    uvResultsEl.textContent = "UVI: "
    uvResultsEl.classList = "weather-results"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if(index.value <=2) {
        uvIndexValue.classList = "favorable"
    } else if (index.value >2 && index.value<=8) {
        uvIndexValue.classList = "moderate"
    } else if (index.value >8) {
        uvIndexValue.classList = "severe"
    };
    
    uvResultsEl.appendChild(uvIndexValue);
    weatherSetsEl.appendChild(uvResultsEl);
}

var fiveDayForecast = function (cityName) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=4aa8b0f77c886819d2b920f429db711e`;

    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
              displayDaily(data, cityName);
          });
          }
      });

}


var displayDaily = function (weather) {
    dailyForecastEl.textContent = ""

    var forecast = weather.list;
    for(var i=5; i < forecast.length; i=i+8) {
        var daily = forecast[i];

    var fiveDayEl = document.createElement("div");
    fiveDayEl.classList = "card five-day col-2";

    var futureDate = document.createElement("div");
    futureDate.textContent = moment.unix(daily.dt).format("M/D");
    futureDate.classList = "card-header text-center dashboard";
    fiveDayEl.appendChild(futureDate);
    

    var futureTempEl = document.createElement("span");
    futureTempEl.textContent = Math.floor(daily.main.temp) + "°";
    fiveDayEl.appendChild(futureTempEl);

    var futureHumidityEl = document.createElement("span");
    futureHumidityEl.textContent = daily.main.humidity + "%";
    fiveDayEl.appendChild(futureHumidityEl);

    var futureWindEl = document.createElement("span");
    futureWindEl.textContent = Math.floor(daily.wind.speed) + " mph";
    fiveDayEl.appendChild(futureWindEl);
    
        dailyForecastEl.appendChild(fiveDayEl);
    }

}

searchButtonEl.addEventListener("click", formSubmit);