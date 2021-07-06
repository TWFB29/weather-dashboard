var d = moment().format('l');
var userInput = $("#userInput");
var setImg = document.getElementById("icon")
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


            var uvApi = "https://api.openweathermap.org/data/2.5/onecall?&lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
            fetch(uvApi).then(response => {
                return response.json()
        }).then(data => {
            console.log(data) 
            //current conditions 
            uvIndex.innerHTML = "UV Index: " + data.current.uvi
            windSpeed.innerHTML = "Wind: " + data.current.wind_speed + " MPH"
            Humidity.innerHTML = "Humidity: " + data.current.humidity + " %"
            Temperature.innerHTML = "Temp: " + data.current.temp + " ℉"
            CurrentConditions.innerHTML = cityName + "(" + d + ")"
            setImg.setAttribute("src", "https://openweathermap.org/img/w/" +  data.current.weather[0].icon + ".png")  
            console.log(data)
            
        })   
        fetch(weatherApi).then(response => {
            return response.json()
    }).then(data => {
            setConditions()}) 
        function setConditions() {
            for(i = 0; i < 6; i++) {
                
                //console.log(card)  
              
            
            console.log(data)
            const card = document.getElementsByClassName('card')[i +1];
            const dt  = document.getElementsByClassName('date')[i];
            const Icn = document.getElementsByClassName('icon')[i];
            const Tmp = document.getElementsByClassName('Temperature')[i];
            const Wnd = document.getElementsByClassName('windSpeed')[i];
            const Hum = document.getElementsByClassName('Humidity')[i];
            var ii  = 1
             d = d.split("/")
             var da = Number(d[1]) + ii
             d = d[0] + "/" + da + "/" + d[2]

            Icn.setAttribute("src", "https://openweathermap.org/img/w/" +  data.list[i].weather[0].icon + ".png")
            dt.innerHTML =  d
            Tmp.innerHTML = "Temp: " + data.list[i].main.temp + " ℉"; 
            Wnd.innerHTML = "Wind: " + data.list[i].wind.speed + " MPH"
            Hum.innerHTML = "Humidity: " + data.list[i].main.humidity + " %"

            console.log(Tmp)
            card.appendChild(dt)
            card.appendChild(Wnd)
            card.appendChild(Tmp)
            card.appendChild(Hum)
            
            }
        
        
            
        }
        
    })
   
       
       
            
        
       
        
     
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
 

 