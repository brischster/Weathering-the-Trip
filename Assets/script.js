var myKey = "66b2da9bdb6ae15fb75e947d5646c15c";

var dayOne = $("#dayOne");
var dayTwo = $("#dayTwo");
var dayThree = $("#dayThree");
var dayFour = $("#dayFour");
var dayFive = $("#dayFive");
var currentCityInfo = $("#currentCityBox");
var currentTempBigBox = $("#temp");
var currentWindBigBox = $("#wind");
var currentHumidityBigBox = $("#hum");
var currentUVBigBox = $("#uv");
var cityName = $("#currentCity");

function getWeather(cityLat, cityLong) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLong}&exclude=alerts&appid=${myKey}&units=imperial`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var currentTemp = data.current.temp;
      var currentWind = data.current.wind_speed;
      var currentHumidity = data.current.humidity;
      var uVIndex = data.current.uvi;
      currentTempBigBox.text(`Current Temp: ${currentTemp}`);
      currentWindBigBox.text(`Current Wind Speed: ${currentWind}`);
      currentHumidityBigBox.text(`Current Humidity: ${currentHumidity}`);
      currentUVBigBox.text(`Current UV Index: ${uVIndex}`);

      var dayOneIcon = data.daily[0].weather[0].id;
      var dayOneTemp = data.daily[0].temp.day;
      var dayOneWind = data.daily[0].wind_speed;
      var dayOneHumidity = data.daily[0].humidity;

      dayOne.text(`${dayOneIcon}
      Temp: ${dayOneTemp}
      Wind: ${dayOneWind}
      Humidity:${dayOneHumidity}`);

      var dayTwoIcon = data.daily[1].weather[0].id;
      var dayTwoTemp = data.daily[1].temp.day;
      var dayTwoWind = data.daily[1].wind_speed;
      var dayTwoHumidity = data.daily[1].humidity;

      dayTwo.text(`${dayTwoIcon}
      Temp: ${dayTwoTemp}
      Wind: ${dayTwoWind}
      Humidity:${dayTwoHumidity}`);
      // for (var i = 0; i < foreCast.length; i++) {
      //   day
      // }
    });
}

// function weatherForcast() {
//   var keys = Object.keys(weatherObj);
//   console.log(keys);
// }
// weatherForcast();

function getCity() {
  var searchButton = $(this).hasClass("btn");
  if (searchButton) {
    var searchCity = $(this).siblings("input").val();
    // console.log(searchCity);
    localStorage.setItem("searchedCity", searchCity);
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

      var lastSearch = localStorage.getItem("searchedCity");
      if (lastSearch !== null && searchButton) {
        // console.log(lastSearch);
        var newCityButton = $("<button></button>").text(searchCity);
        $(".list-group").append(newCityButton);
        // cityName.text(`${searchCity}'s Current Weather`);
      }
      var today = new Date();
      var currentDay = today.getDate();
      var currentMonth = today.getMonth();
      var currentYear = today.getFullYear();
      cityName.text(
        `${searchCity} ${currentMonth}/${currentDay}/${currentYear} Current Weather`
      );
      // console.log(searchButton);
    });
}

// async function renderWeather() {
//   currentTempBigBox.text(`Current Temp: ${currentTemp}`);
//   console.log(currentTemp);
//   // cardDiv.addClass('flex-column card');
//   // showThisCard.attr('id', cardID);
//   // showThisCard.attr('src', whatCard); //removed .img
//   currentCityInfo.append(currentTempBigBox);
//   // current.append(cardDiv);
//   // cardDiv.append(showThisCard);
// }

// renderWeather();

$("#pastButtons").on("click", "button", getCity);
