import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
// TODO: Complete the WeatherService class
class WeatherService {
    constructor() {
        this.baseURL = 'https://api.openweathermap.org/data/2.5/forecast';
        this.geoURL = 'http://api.openweathermap.org/geo/1.0/direct';
        this.apiKey = process.env.API_KEY || '';
    }
    // TODO: Create fetchLocationData method
    async fetchLocationData(query) {
        const url = `${this.geoURL}?q=${query}&limit=1&appid=${this.apiKey}`;
        const response = await axios.get(url);
        return response.data;
    }
    // TODO: Create destructureLocationData method
    destructureLocationData(locationData) {
        if (!locationData.length)
            throw new Error('Location not found');
        return {
            lat: locationData[0].lat,
            lon: locationData[0].lon,
        };
    }
    // TODO: Create buildWeatherQuery method
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
    }
    // TODO: Create fetchWeatherData method
    async fetchWeatherData(coordinates) {
        const url = this.buildWeatherQuery(coordinates);
        const response = await axios.get(url);
        return response.data;
    }
    // TODO: Build parseCurrentWeather method
    parseCurrentWeather(response) {
        const current = response.list[0];
        return {
            date: current.dt_txt,
            temperature: current.main.temp,
            windSpeed: current.wind.speed,
            humidity: current.main.humidity,
            description: current.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${current.weather[0].icon}.png`,
        };
    }
    // TODO: Complete buildForecastArray method
    buildForecastArray(weatherData) {
        return weatherData.filter((_, index) => index % 8 === 0).map((data) => ({
            date: data.dt_txt,
            temperature: data.main.temp,
            windSpeed: data.wind.speed,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        }));
    }
    // TODO: Complete getWeatherForCity method
    async getWeatherForCity(city) {
        const locationData = await this.fetchLocationData(city);
        const coordinates = this.destructureLocationData(locationData);
        const weatherData = await this.fetchWeatherData(coordinates);
        const currentWeather = this.parseCurrentWeather(weatherData);
        const forecast = this.buildForecastArray(weatherData.list);
        return { current: currentWeather, forecast };
    }
}
export default new WeatherService();
