function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current; //changes the hardcoded temperature to the one called by the API
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#city"); //selects city
  cityElement.innerHTML =
    response.data.city; /*changing the html of the city to the value of 
   what the user searches, .value is basically the new city */

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000); //converting seconds into milliseconds
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon")
   iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"class= weather-app-temp-icon"/>`;

  console.log(response.data);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0 ${hours}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  //calls api to update city and show data for the city

  let apiKey = "0d960fc5373f90965a3a4tb970addoe0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input"); //selects place holder

  searchCity(searchInput.value); //this makes the value to be sent to the searchcity function so the api can be called
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");
