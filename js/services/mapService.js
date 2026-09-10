// ==========================================================================
// IND TRAVEL — Map Integration Service Layer
// ==========================================================================

const MapService = {
    async searchLocation(query) {
        const response = await ApiClient.post('maps/search', { query });
        if (response.status === 'success' && !response.demo_mode && response.result) {
            return { source: 'live', data: response.result };
        }
        return { source: 'demo', data: null };
    }
};

window.MapService = MapService;
