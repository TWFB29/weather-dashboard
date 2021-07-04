var weatherApi = "http://api.openweathermap.org/data/2.5/forecast?q=Akron&units=imperial&appid=c81ae0be75f519c71d1f855b95d48ec3"
//var uvApi = "https://api.weatherapi.com/v1/current.json?key=4d1eb742cf2946789e8211124213006&q=Akron"
var apiKey = "c81ae0be75f519c71d1f855b95d48ec3"
//var citySearch  = 
//var getForcast = function()



function plsfut(){
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
       //var stuff = data.current.condition.icon
       //var spl = stuff.split(".com/")
       //console.log(spl[1])
       var img = document.createElement("img");
     img.src = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
     var src = document.getElementById("CurrentConditions");
     src.appendChild(img);
    });
}

    

 plsfut()

 