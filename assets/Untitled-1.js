var weatherApi = "http://api.openweathermap.org/data/2.5/forecast?q=Akron&units=imperial&appid=c81ae0be75f519c71d1f855b95d48ec3"

var apiKey = "9821b0d23b1f66242e790f48ced2591f";

 

var userInput = $("#userInput");

var searchButton = $("#searchButton");

var clearHistoryButton = $("#clearHistoryButton");

var historyList = $('#savedSearches');

 

var cityList = [];

 

// BUTTONS

searchButton.on("click", function(event){

    event.preventDefault();

    var inputValue = userInput.val().trim();

    weatherConditionsRequest(inputValue)

    searchHistory(inputValue);    

    userInput.val(""); 

});

 

clearHistoryButton.on("click", function(){

    cityList = [];

    listArray();

});

 

// Grab city list string from local storage

// and update the city list array

// for the search history sidebar

function initalizeHistory() {

    if (localStorage.getItem("cities")) {

        cityList = JSON.parse(localStorage.getItem("cities"));

        var lastIndex = cityList.length - 1;

        // console.log(cityList);

        listArray();

        // Display the last city viewed

        // if page is refreshed

        if (cityList.length !== 0) {

            weatherConditionsRequest(cityList[lastIndex]);

        }

    }

};

 

// Display and save the search history of cities

function searchHistory(searchValue) {

    // Grab value entered into search bar 

    // var searchValue = searchCityInput.val().trim();

    

    // If there are characters entered into the search bar

    if (searchValue) {

        // Place value in the array of cities

        // if it is a new entry

        if (cityList.indexOf(searchValue) === -1) {

            cityList.push(searchValue);

            // List all of the cities in user history

            listArray();

        } else {

            // Remove the existing value from

            // the array

            var removeIndex = cityList.indexOf(searchValue);

            cityList.splice(removeIndex, 1);

 

            // Push the value again to the array

            cityList.push(searchValue);

 

            // list all of the cities in user history

            // so the old entry appears at the top

            // of the search history

            listArray();

            clearHistoryButton.removeClass("hide");

            weatherContent.removeClass("hide");

        }

    }

    console.log(cityList);

};

// history buttons that spawn from user input

function listArray() {

    historyList.empty();

    cityList.forEach(function(city){

        var historyLiEl = $('<li class="list-group-item city-btn">'); 

        historyLiEl.attr("data-value", city);

        historyLiEl.text(city);

        historyList.prepend(historyLiEl);

    });

    localStorage.setItem("cities", JSON.stringify(cityList));

};

 

historyList.on("click","li.cityButton", function(event) {

    var value = $(this).data("value");

    weatherConditionsRequest(value);

    searchHistory(value); 

});

 

// API code

function weatherConditionsRequest() {

    fetch(weatherApi).then(response => {

        return response.json()

 

    }).then(data => {

        var lat = data.city.coord.lat

        var lon = data.city.coord.lon

        console.log(lat)

        console.log(lon)

        var cityName = data.city.name

 

        var currentDateStr = (data.list[0].dt_txt);

        var currentDate = currentDateStr.split(" ");

 

        var uvApi = "https://api.openweathermap.org/data/2.5/onecall?&lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

        fetch(uvApi).then(response => {

            return response.json()

 

        }).then(data => {

            console.log(data)

            var uvi = document.createElement("Ui");

            var txtUvi = document.createTextNode("UV Index: " + data.current.uvi)

            uvi.appendChild(txtUvi);

            document.getElementById("uvIndex").appendChild(uvi);

 

            var windSpeed = document.createElement("Ui");

            var txtWind = document.createTextNode("Wind: " + data.current.wind_speed + " MPH")

            windSpeed.appendChild(txtWind);

            document.getElementById("windSpeed").appendChild(windSpeed)

 

            var Humidity = document.createElement("Ui");

            var txtHumidity = document.createTextNode("Humidity: " + data.current.humidity + " %")

            Humidity.appendChild(txtHumidity);

            document.getElementById("Humidity").appendChild(Humidity)

 

            var Temp = document.createElement("Ui");

            var txtTemp = document.createTextNode("Temp: " + data.current.temp + " ℉")

            Temp.appendChild(txtTemp);

            document.getElementById("Temperature").appendChild(Temp)

 

            var currentHeader = document.createElement("h2");

            var txtCurrentHeader = document.createTextNode(cityName + "(" + currentDate[0] + ")")

            currentHeader.appendChild(txtCurrentHeader);

            document.getElementById("CurrentConditions").appendChild(currentHeader)

        })

        var img = document.createElement("img");

        img.src = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";

        var src = document.getElementById("CurrentConditions");

        src.appendChild(img);

    });

};