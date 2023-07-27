const cityForm = document.getElementById("cityForm");
const cityInput = document.getElementById("cityInput");
const currentWeatherSection = document.getElementById("currentWeather");
const forecastSection = document.getElementById("forecast");
const searchHistorySection = document.getElementById("searchHistory");
let searchHistory = [];

cityForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const cityName = cityInput.value.trim();
  if (cityName === "") return;

  const apiKey = 'de499e2ee729b13656959965fb76984a';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${apiKey}`;

  //GOT MAJOR HELP FROM A FAMILY MEMBER ON THESE COMING SECTIONS SPECIFICALLY ON CONVERTING TO FAHRENHEIT
  fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const windSpeedMeters = data.wind.speed;
  const temperatureKelvin = data.main.temp;
  const humidity = data.main.humidity;

  //Converts kelvin to fahrenheit
  const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;
  const temperatureCelsius = temperatureKelvin - 273.15;

  //Converts meters per second to mph
  const windSpeedMph = windSpeedMeters * 2.237;
  
  console.log("Temperature in Fahrenheit:", temperatureFahrenheit);
  console.log("Temperature in Celsius:", temperatureCelsius); //only haven't removed this line as it bugs when i remove it

  document.getElementById("windSpeed").textContent = `Wind Speed: ${windSpeedMph.toFixed(2)} mph`;
  document.getElementById("temperature").textContent = `Temperature: ${temperatureFahrenheit.toFixed(2)}°F`;
  document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
});

fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      const forecastList = document.getElementById("forecastList");

      forecastList.innerHTML = "";

      const forecasts = data.list;
      const fiveDayForecasts = forecasts.filter((forecast) => forecast.dt_txt.includes("12:00:00"));

      fiveDayForecasts.forEach((forecast) => {
        const date = new Date(forecast.dt_txt);
        const temperatureKelvin = forecast.main.temp;
        const temperatureCelsius = temperatureKelvin - 273.15;
        const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;
        const humidity = forecast.main.humidity;
        const windSpeedMetersPerSec = forecast.wind.speed;
        const windSpeedMph = windSpeedMetersPerSec * 2.237;

      //Got help learning how to accurately put HTML in my JS
        const forecastItem = document.createElement("div");
        forecastItem.innerHTML = `
          <p>Date: ${date.toDateString()}</p>
          <p>Wind Speed: ${windSpeedMph.toFixed(2)} mph</p>
          <p>Temperature: ${temperatureFahrenheit.toFixed(2)}°F</p>
          <p>Humidity: ${humidity}%</p>
        `;

        forecastList.appendChild(forecastItem);
      });
    });

  citySearchHistory(cityName);
});

  function citySearchHistory(cityName) {
    if (searchHistory.includes(cityName)) return;
    searchHistory.push(cityName);
    showSearchHistory();
  }
  
  function showSearchHistory() {
    searchHistorySection.innerHTML = "";
    const ul = document.createElement("ul");
    searchHistory.forEach((city) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = city;
      button.addEventListener("click", function () {
        cityInput.value = city;
        cityForm.dispatchEvent(new Event("submit"));
      });
      li.appendChild(button);
      ul.appendChild(li);
    });
    searchHistorySection.appendChild(ul);
  }