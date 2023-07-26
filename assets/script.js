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

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;

      document.getElementById("weatherDescription").textContent = `Weather: ${weatherDescription}`;
      document.getElementById("temperature").textContent = `Temperature: ${temperature}°F`;
      document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
    })

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
  