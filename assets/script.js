
var userInput = $("#userInput");
var setImg = document.getElementById("icon")
var icon1 = document.getElementById("icon1")
var searchButton = $("#searchButton");

var clearHistoryButton = $("#clearHistoryButton");

var historyList = $('#savedSearches');

 

var cityList = [];


// BUTTONS
searchButton.on("click", function(event) {
    event.preventDefault();
    document.getElementById("CurrentConditions").removeChild
    cur = ""
    var inputValue = userInput.val().trim();
    console.log(inputValue)
    //searchHistory(inputValue);    
    
   
    const rem = document.querySelector('#CurrentConditions');
    rem.remove;

     WeatherFill()



    function WeatherFill(){
        var apiKey = "c81ae0be75f519c71d1f855b95d48ec3"
        var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputValue + "&units=imperial&appid=" + apiKey
        console.log(weatherApi)
        fetch(weatherApi).then(response => {
            return response.json()
            
        }).then(data => {
            var lat = data.city.coord.lat
            var lon = data.city.coord.lon
            console.log(lat)
            console.log(lon)
            var cityName = data.city.name
            console.log(data.list[0].dt_txt)

            
            
                var currentDateStr = (data.list[0].dt_txt);
                var currentDate = currentDateStr.split(" ");
                var currentDateStr = currentDate[0]
                var currentDate = currentDateStr.split("-");
                currentDate = currentDate[2] - 1 + "/" + currentDate[1] + "/" + currentDate[0] 
                console.log(currentDate)


            var uvApi = "https://api.openweathermap.org/data/2.5/onecall?&lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
            fetch(uvApi).then(response => {
                return response.json()
                $('#cityInputCurrentConditions').empty();
        }).then(data => {
            console.log(data) 
            //current conditions 
            uvIndex.innerHTML = "UV Index: " + data.current.uvi
            windSpeed.innerHTML = "Wind: " + data.current.wind_speed + " MPH"
            Humidity.innerHTML = "Humidity: " + data.current.humidity + " %"
            Temperature.innerHTML = "Temp: " + data.current.temp + " ℉"
            CurrentConditions.innerHTML = cityName + "(" + currentDate + ")"
            setImg.setAttribute("src", "https://openweathermap.org/img/w/" +  data.current.weather[0].icon + ".png")  
            console.log(data)
            //var weatherApi = "http://api.openweathermap.org/data/2.5/forecast?q=" + inputValue + "&units=imperial&appid=" + apiKey
            var ii = 1 
            
            
            date1.innerHTML = dd[2] + "/" + dd[1] + "/" + dd[0]
            icon1.setAttribute("src", "https://openweathermap.org/img/w/" +  data.list[1].weather[1].icon + ".png")
            temp1.innerHTML = "Temp: " + data.list[1].temp + " ℉"
            wind1.innerHTML = "Wind: " + data.list[1].wind.speed + " MPH"
            humidity1.innerHTML = "Humidity: " + data.list[1].main.humidity + " %"
            
        })
        
        console.log(data)
       
            
        
       
        
        
        });
    }

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
 

 