// ==========================================================================
// IND TRAVEL — AI Smart Trip Planner Service Layer
// ==========================================================================

const AIService = {
    async generateTripPlan(request) {
        // request object expects: { destination, days, budget, travelers, interests }

        // Attempt real API call via the proxy
        const response = await ApiClient.post('ai/planner', request);

        if (response.status === 'success' && !response.demo_mode && response.result) {
            // In a real scenario, response.result contains the generated JSON
            return {
                source: 'live',
                data: response.result
            };
        }

        // Fallback: If it's DEMO_MODE, missing key, or an error occurred
        return {
            source: 'demo',
            data: null // The UI layer (tripPlanner.js) handles demo payload matching
        };
    }
};

window.AIService = AIService;
