import { Router } from 'express';
const router = Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    try {
        const { city } = req.body;
        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }
        // TODO: GET weather data from city name
        const weatherData = await WeatherService.getWeatherForCity(city);
        if (!weatherData || !weatherData.current) {
            return res.status(500).json({ error: 'Invalid weather data received.' });
        }
        // TODO: save city to search history
        await HistoryService.addCity(city);
        return res.json(weatherData);
    }
    catch (error) {
        console.error('Error fetching weather:', error);
        return res.status(500).json({ error: 'Failed to retrieve weather data' });
    }
});
// TODO: GET search history
router.get('/history', async (_req, res) => {
    try {
        const history = await HistoryService.getCities();
        return res.json(history);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve search history' });
    }
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const success = await HistoryService.removeCity(id);
        if (!success) {
            return res.status(404).json({ error: 'City not found' });
        }
        return res.json({ message: 'City removed from history' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to delete city from history' });
    }
});
export default router;
