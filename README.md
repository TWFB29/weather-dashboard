# weather-dashboard
c81ae0be75f519c71d1f855b95d48ec3

function pls(){
fetch(weatherApi).then(response => {
     return response.json()
     
    }).then(data => {
      var stuff = data.current.condition.icon
      var spl = stuff.split(".com/")
      console.log(spl[1])
      var img = document.createElement("img");
    img.src = "./assets/" + spl[1];
    var src = document.getElementById("tt");
    src.appendChild(img);
      console.log(img)  
    }).catch(error => {
        console.log(error)
    });
}


function plsfut(){
    fetch(weatherApi).then(response => {
         return response.json()
    }).then(data => {
        console.log(data.list[0].)
        
    })
         
        
    }

    

 plsfut()
