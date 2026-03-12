function refreshWeather(response){
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current; //changes the hardcoded temperature to the one called by the API
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#city"); //selects city
  cityElement.innerHTML = response.data.city; /*changing the html of the city to the value of 
   what the user searches, .value is basically the new city */

  let descriptionElement = document.querySelector("#description")
  descriptionElement.innerHTML = response.data.condition.description;

   console.log(response.data.condition.description);
}


function searchCity(city){
  //calls api to update city and show data for the city

    let apiKey = "0d960fc5373f90965a3a4tb970addoe0";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);

}


function handleSearchSubmit(event){
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input"); //selects place holder
  

   searchCity(searchInput.value); //this makes the value to be sent to the searchcity function so the api can be called


}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg")