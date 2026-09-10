// ==========================================================================
// IND TRAVEL — Weather Integration Service Layer
// ==========================================================================

const WeatherService = {
    async getWeather(location) {
        const response = await ApiClient.post('weather/current', { location });
        if (response.status === 'success' && !response.demo_mode && response.result) {
            return { source: 'live', data: response.result };
        }
        return { source: 'demo', data: null };
    }
};

window.WeatherService = WeatherService;
