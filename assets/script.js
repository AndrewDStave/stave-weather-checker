const cityForm = document.getElementById("cityForm");
const cityInput = document.getElementById("cityInput");
const currentWeatherSection = document.getElementById("currentWeather");
const forecastSection = document.getElementById("forecast");
const searchHistorySection = document.getElementById("searchHistory");
let searchHistory = [];

// ... your existing code

cityForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const cityName = cityInput.value.trim();
  if (cityName === "") return;

  const apiKey = 'de499e2ee729b13656959965fb76984a';
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${apiKey}`;

  //GOT MAJOR HELP FROM A FAMILY MEMBER ON THESE COMING SECTIONS SPECIFICALLY ON CONVERTING TO FARENHEIT TO CELSIUS
  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      const weatherDescription = data.weather[0].description;
      const temperatureKelvin = data.main.temp;
      const temperatureCelsius = temperatureKelvin - 273.15;
      const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;
      const humidity = data.main.humidity;

      document.getElementById("weatherDescription").textContent = `Weather: ${weatherDescription}`;
      document.getElementById("temperature").textContent = `Temperature: ${temperatureFahrenheit.toFixed(2)}°F (${temperatureCelsius.toFixed(2)}°C)`;
      document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
    });

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      const forecastList = document.getElementById("forecastList");

      const forecasts = data.list;
      const fiveDayForecasts = forecasts.filter((forecast) => forecast.dt_txt.includes("12:00:00")); // Get only one forecast per day

      fiveDayForecasts.forEach((forecast) => {
        const date = new Date(forecast.dt_txt);
        const weatherDescription = forecast.weather[0].description;
        const temperatureKelvin = forecast.main.temp;
        const temperatureCelsius = temperatureKelvin - 273.15;
        const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;
        const humidity = forecast.main.humidity;

        const forecastItem = document.createElement("div");
        forecastItem.innerHTML = `
          <p>Date: ${date.toDateString()}</p>
          <p>Weather: ${weatherDescription}</p>
          <p>Temperature: ${temperatureFahrenheit.toFixed(2)}°F (${temperatureCelsius.toFixed(2)}°C)</p>
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
  