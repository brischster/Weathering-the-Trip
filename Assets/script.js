var myKey = "66b2da9bdb6ae15fb75e947d5646c15c";

var dayOne = $("#dayOne");
var dayOneIcon = $("#iconOne");
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

      const futureDates1 = new Date();
      futureDates1.setDate(new Date().getDate() + 1);
      var dd1 = futureDates1.getDate();
      var mm1 = futureDates1.getMonth();
      var yyyy1 = futureDates1.getFullYear();

      var dayOneIcon = data.daily[0].weather[0].icon;
      console.log(dayOneIcon);
      var dayOneTemp = data.daily[0].temp.day;
      var dayOneWind = data.daily[0].wind_speed;
      var dayOneHumidity = data.daily[0].humidity;
      // var iconurl = `http://openweathermap.org/img/w/${dayOneIcon}.png`;

      // $("#iconOne").attr(
      //   "src",
      //   `http://openweathermap.org/img/w/${dayOneIcon}.png`
      // );

      dayOne.text(`${mm1}/${dd1}/${yyyy1}
      Temp: ${dayOneTemp}
      Wind: ${dayOneWind}
      Humidity:${dayOneHumidity}`);

      var dayTwoIcon = data.daily[1].weather[0].id;
      var dayTwoTemp = data.daily[1].temp.day;
      var dayTwoWind = data.daily[1].wind_speed;
      var dayTwoHumidity = data.daily[1].humidity;

      const futureDates2 = new Date();
      futureDates2.setDate(new Date().getDate() + 2);
      var dd2 = futureDates2.getDate();
      var mm2 = futureDates2.getMonth();
      var yyyy2 = futureDates2.getFullYear();

      dayTwo.text(`${mm2}/${dd2}/${yyyy2}
      Temp: ${dayTwoTemp}
      Wind: ${dayTwoWind}
      Humidity:${dayTwoHumidity}`);

      var dayThreeIcon = data.daily[2].weather[0].id;
      var dayThreeTemp = data.daily[2].temp.day;
      var dayThreeWind = data.daily[2].wind_speed;
      var dayThreeHumidity = data.daily[2].humidity;

      const futureDates3 = new Date();
      futureDates3.setDate(new Date().getDate() + 3);
      var dd3 = futureDates3.getDate();
      var mm3 = futureDates3.getMonth();
      var yyyy3 = futureDates3.getFullYear();

      dayThree.text(`${mm3}/${dd3}/${yyyy3}
      Temp: ${dayThreeTemp}
      Wind: ${dayThreeWind}
      Humidity:${dayThreeHumidity}`);

      var dayFourIcon = data.daily[3].weather[0].id;
      var dayFourTemp = data.daily[3].temp.day;
      var dayFourWind = data.daily[3].wind_speed;
      var dayFourHumidity = data.daily[3].humidity;

      const futureDates4 = new Date();
      futureDates4.setDate(new Date().getDate() + 4);
      var dd4 = futureDates4.getDate();
      var mm4 = futureDates4.getMonth();
      var yyyy4 = futureDates4.getFullYear();

      dayFour.text(`${mm4}/${dd4}/${yyyy4}
      Temp: ${dayFourTemp}
      Wind: ${dayFourWind}
      Humidity:${dayFourHumidity}`);

      var dayFiveIcon = data.daily[4].weather[0].id;
      var dayFiveTemp = data.daily[4].temp.day;
      var dayFiveWind = data.daily[4].wind_speed;
      var dayFiveHumidity = data.daily[4].humidity;

      const futureDates5 = new Date();
      futureDates5.setDate(new Date().getDate() + 5);
      var dd5 = futureDates5.getDate();
      var mm5 = futureDates5.getMonth();
      var yyyy5 = futureDates5.getFullYear();

      dayFive.text(`${mm5}/${dd5}/${yyyy5}
      Temp: ${dayFiveTemp}
      Wind: ${dayFiveWind}
      Humidity:${dayFiveHumidity}`);
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
  var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&appid=${myKey}`;

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
