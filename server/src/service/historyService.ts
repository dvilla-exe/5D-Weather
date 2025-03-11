import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
class City {
  constructor(public id: string, public name: string) {}
}

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath: string = path.resolve(__dirname, '..', '..', 'db', 'db.json');

  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error: any) {
      if (error.code === 'ENOENT') return []; // Return empty array if file doesn't exist
      console.error('Error reading search history:', error);
      throw new Error('Failed to read search history');
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing search history:', error);
      throw new Error('Failed to write search history');
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return await this.read();
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string): Promise<City> {
    const cities = await this.read();
    const newCity = new City(uuidv4(), city);
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<boolean> {
    let cities = await this.read();
    const filteredCities = cities.filter(city => city.id !== id);
    if (filteredCities.length === cities.length) return false;
    await this.write(filteredCities);
    return true;
  }
}

export default new HistoryService();

