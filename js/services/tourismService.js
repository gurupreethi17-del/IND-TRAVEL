// ==========================================================================
// IND TRAVEL — Tourism Intelligence Service Layer
// ==========================================================================

const TourismService = {
    async getTourismStatistics() {
        const response = await ApiClient.get('tourism/statistics');
        if (response.status === 'success' && !response.demo_mode && response.result) {
            return { source: 'live', data: response.result };
        }
        return { source: 'demo', data: null };
    },

    async getPopularDestinations() {
        const response = await ApiClient.get('tourism/destinations');
        if (response.status === 'success' && !response.demo_mode && response.result) {
            return { source: 'live', data: response.result };
        }
        return { source: 'demo', data: null };
    }
};

window.TourismService = TourismService;
