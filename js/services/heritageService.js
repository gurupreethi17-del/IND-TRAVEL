// ==========================================================================
// IND TRAVEL — Heritage AI Vision Service Layer
// ==========================================================================

const HeritageService = {
    async scanHeritageImage(imageBase64) {
        // Attempt real API call via the proxy
        const response = await ApiClient.post('ai/vision', { image: imageBase64 });

        if (response.status === 'success' && !response.demo_mode && response.result) {
            return {
                source: 'live',
                data: response.result // Should map to {name, location, historical period, etc}
            };
        }

        // Fallback Scenario
        return {
            source: 'demo',
            data: null // Handled by UI
        };
    }
};

window.HeritageService = HeritageService;
