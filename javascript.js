$(document).ready(function(){
  
  var lat;
  var lon;
  var key = 'f3bddab5d3eafaf07b7f962585ff64a7';
  var fahrenheit;
  var celsius;
  var tempToggle = true;
  var currentTime = new Date();
  var month = currentTime.getMonth();
  var day = currentTime.getDate();
  var year = currentTime.getFullYear();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  // display weather
  displayWeather();
  
  // location
  function displayWeather() {
    //get location data
    var coordinates = 'http://ip-api.com/json';
    $.getJSON(coordinates, function(json) {
      lat = json.lat;
      lon = json.lon;
  
      // get weather data 
      var weatherApi = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key;
      $.getJSON(weatherApi, function(data) {
        console.log(weatherApi);
        var kelvinTemp  = data.main.temp;
        var humidity = data.main.humidity;
        var city = data.name;
        fahrenheit = ((( kelvinTemp - 273.15) * 9/5) + 32).toFixed(2);
        celsius = (kelvinTemp-=273.15).toFixed(2);
        
        //toggle F and C
        $('#temp').html(fahrenheit + ' &#8457;');
        $('#temp').on('click', function(){
          if(tempToggle === false) {
            $('#temp').html(celsius + ' &#8451;');
            tempToggle = true;
          } else {
            $('#temp').html(fahrenheit + ' &#8457;');
            tempToggle = false;
          }
        })
        $('#city').html(city);
        $('#humidity').html(humidity + '% humidity');
        $('#dateTime').html(day + '/' +  month + '/' + year + ' ' + hours + ':' + minutes);

        //background display
        if(fahrenheit > 80) {
          $('body').css('background', 'url("https://preview.ibb.co/dyAJzF/grant_ritchie_338179.jpg")no-repeat 0 0 transparent');
        } else if(fahrenheit > 69) {
          $('body').css('background', 'url("https://preview.ibb.co/nKO29F/alexandru_tudorache_17852.jpg")no-repeat 0 0 transparent');
        }  else if(fahrenheit > 49) {
          $('body').css('background', 'url("https://preview.ibb.co/kpfwmv/gabriele_diwald_rain.jpg")no-repeat 0 0 transparent');
        } else if(fahrenheit > 29) {
          $('body').css('background', 'url("https://preview.ibb.co/hMOxbv/michael_hacker_191496.jpg")no-repeat 0 0 transparent');
        } else {
          $('body').css('background', 'url("https://preview.ibb.co/fdyr3a/anna_popovic_167310.jpg")no-repeat 0 0 transparent');
        }

      })
    })
  }
});