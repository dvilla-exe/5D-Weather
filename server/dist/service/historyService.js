import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class City {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
class HistoryService {
    constructor() {
        this.filePath = path.resolve(__dirname, '..', '..', 'db', 'searchHistory.json');
    }
    async read() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            if (error.code === 'ENOENT')
                return []; // If file doesn't exist, return empty array
            console.error('Error reading search history:', error);
            throw new Error('Failed to read search history');
        }
    }
    async write(cities) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
        }
        catch (error) {
            console.error('Error writing search history:', error);
            throw new Error('Failed to write search history');
        }
    }
    async getCities() {
        return await this.read();
    }
    async addCity(city) {
        const cities = await this.read();
        const newCity = new City(uuidv4(), city);
        cities.push(newCity);
        await this.write(cities);
        return newCity;
    }
    // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
    async removeCity(id) {
        let cities = await this.read();
        const filteredCities = cities.filter(city => city.id !== id);
        if (filteredCities.length === cities.length)
            return false;
        await this.write(filteredCities);
        return true;
    }
}
export default new HistoryService();
