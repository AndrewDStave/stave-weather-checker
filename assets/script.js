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

  var APIKey = de499e2ee729b13656959965fb76984a

  // Call a function to fetch weather data from an API based on the cityName
  // Once you receive the data, update the currentWeatherSection and forecastSection
  // with the appropriate information

  citySearchHistory(cityName);
});

function citySearchHistory(cityName) {
  if (searchHistory.includes(cityName)) return;
  searchHistory.push(cityName);
  renderSearchHistory();
}

function renderSearchHistory() {
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
