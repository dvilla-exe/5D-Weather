import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
interface Weather {
  date: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  description: string;
  icon: string;
}

// TODO: Complete the WeatherService class
class WeatherService {
  private baseURL: string = 'https://api.openweathermap.org/data/2.5/forecast';
  private geoURL: string = 'http://api.openweathermap.org/geo/1.0/direct';
  private apiKey: string = process.env.API_KEY || '';

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    const url = `${this.geoURL}?q=${query}&limit=1&appid=${this.apiKey}`;
    const response = await axios.get(url);
    return response.data;
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any[]): Coordinates {
    if (!locationData.length) throw new Error('Location not found');
    return {
      lat: locationData[0].lat,
      lon: locationData[0].lon,
    };
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = this.buildWeatherQuery(coordinates);
    const response = await axios.get(url);
    return response.data;
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
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
  private buildForecastArray(weatherData: any[]): Weather[] {
    return weatherData.filter((_: any, index: number) => index % 8 === 0).map((data: any) => ({
      date: data.dt_txt,
      temperature: data.main.temp,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
    }));
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<{ current: Weather; forecast: Weather[] }> {
    const locationData = await this.fetchLocationData(city);
    const coordinates = this.destructureLocationData(locationData);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecast = this.buildForecastArray(weatherData.list);
    return { current: currentWeather, forecast };
  }
}

export default new WeatherService();

