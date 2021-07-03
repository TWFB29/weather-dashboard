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
        
        

         var uvApi = "https://api.openweathermap.org/data/2.5/onecall?&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
         fetch(uvApi).then(response => {
            return response.json()
            
       }).then(data => {
           console.log(data.current.uvi)
           
       })
       //var stuff = data.current.condition.icon
       //var spl = stuff.split(".com/")
       //console.log(spl[1])
       var img = document.createElement("img");
     img.src = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
     var src = document.getElementById("tt");
     src.appendChild(img);
    });
}

    

 plsfut()

 