import * as forecastjs from './forecast.js'
const form = document.querySelector('.change-location')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const forecast = new forecastjs.Forecast()

const updateUI = (data) => {
    localStorage.setItem('data', JSON.stringify(data))
    const { city, weather } = data
    details.querySelector('.city-name').innerText = `${city.EnglishName} (${city.Country.ID})`
    details.querySelector('.weather-condition').innerText = weather.WeatherText
    details.querySelector('div .temp').innerText = weather.Temperature.Metric.Value
    weather.IsDayTime ? card.querySelector('.time').setAttribute('src', 'img/day.svg') : card.querySelector('.time').setAttribute('src', 'img/night.svg')
    card.querySelector('.icon img').setAttribute('src', `img/icons/${weather.WeatherIcon}.svg`)
    if(card.classList.contains('d-none'))card.classList.remove('d-none')
}
form.addEventListener('submit', e => {
    e.preventDefault()
    const cityName = form.city.value.trim()
    forecast.updateCity(cityName)
    .then(data => updateUI(data))
    form.reset()
})
if(localStorage.getItem('data')){
    const data = JSON.parse(localStorage.getItem('data'))
    updateUI(data)
}
