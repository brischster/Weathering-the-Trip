var myKey = "66b2da9bdb6ae15fb75e947d5646c15c";

// var chicago = 41.8781° N, 87.6298° W

// var exclude =

function getWeather(cityLat, cityLong) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLong}&exclude=alerts&appid=${myKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherObj) {
      console.log(weatherObj);
    });
}

function getCity() {
  var searchButton = $(this).hasClass("btn");
  if (searchButton) {
    var searchCity = $(this).siblings("input").val();
    console.log(searchCity);
  }
  if (!searchButton) {
    var searchCity = $(this).text();
  }
  console.log(searchButton);
  var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&appid=${myKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (locationObj) {
      console.log(locationObj);
      var cityLat = locationObj[0].lat;
      var cityLong = locationObj[0].lon;
      getWeather(cityLat, cityLong);
    });
}

$("#pastButtons").on("click", "button", getCity);
