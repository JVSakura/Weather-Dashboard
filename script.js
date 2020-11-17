let searchHistory = JSON.parse(localStorage.getItem('weatherSearchHistory'))
if (searchHistory === null) {
  searchHistory = []
}

const displayWeather = (city) => {
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=66f427550a65f6b2e1c0322728193766`)
    .then(res => {
      let data = res.data
      let city = data.name

      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=66f427550a65f6b2e1c0322728193766`)
        .then(res => {
          let data = res.data
          console.log(data)
          let current = data.current
          let unixTimestamp = current.dt
          let date = new Date(unixTimestamp * 1000)
          let htmlText = `<h1>${city} (${date.getMonth()}/${date.getDate()}/${date.getFullYear()})</h1>
                              <p>Temperature: ${current.temp} °F</p>
                              <p>Humidity: ${current.humidity}%</p>
                              <p>Wind Speed: ${current.wind_speed} MPH</p>
                              <p>UV Index: <span class="uvi uvi-${getUVIndexRange(current.uvi)}">${current.uvi}</span></p>`

          document.getElementById('currentWeather').innerHTML = htmlText
          htmlText = ''

          for (let i = 1; i < 6; i++) {
            current = data.daily[i]
            unixTimestamp = current.dt
            date = new Date(unixTimestamp * 1000)
            htmlText += `<div class="col-md">
                            <div class="card">
                              <div class="card-body bg-primary text-light forecast">
                                <h4>${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</h4>
                                <p>Temp: ${current.temp.max} °F</p>
                                <p>Humidity: ${current.humidity}%</p>
                              </div>
                            </div>
                          </div>`
          }

          document.getElementById('fiveDayForecast').innerHTML = htmlText

        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}

const displaySearchHistory = () => {
  let list = document.getElementById('searchHistory')
  let htmlText = ''
  let len = searchHistory.length - 1
  for (let i = len; i > -1; i--) {
    htmlText += `<li>
                    <button type="button" class="btn btn-outline-secondary search-history-button" value="${searchHistory[i]}">${searchHistory[i]}</button>
                  </li>`
  }
  list.innerHTML = htmlText
}

displaySearchHistory()

if (searchHistory.length) {
  displayWeather(searchHistory[searchHistory.length - 1])
}

document.getElementById('searchButton').addEventListener('click', (event) => {
  event.preventDefault()
  let input = document.getElementById('searchInput')
  if (input.value !== '') {
    if (searchHistory.length > 10) {
      searchHistory.splice(0, 1)
    }
    searchHistory.push(input.value)
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory))
    displaySearchHistory()
    displayWeather(input.value)
    input.value = ''
  }
})

document.addEventListener('click', (event) => {
  event.preventDefault()
  let target = event.target
  if (target.classList.contains('search-history-button')) {
    displayWeather(target.value)
  }
})