export { Forecast }
class Forecast{
    constructor(){
        this.key = '9TOQo8GLd9eecyGMe1UBVEPNSTIliYph'
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1'
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities'
    }
    async updateCity(cityName){
        const city = await this.getCity(cityName)
        const weather = await this.getWeatherCondition(city.Key)
        return {
            city,
            weather
        }
    }
    async getCity(city){
        const data = await fetch(this.cityURI + `/search?apikey=${this.key}&q=${city}`)
        .then(response => response.json())
        return data[0]
    }
    async getWeatherCondition(key){
        const data = await fetch(this.weatherURI + `/${key}?apikey=${this.key}`)
        .then(response => response.json())
        return data[0]
    }
}


