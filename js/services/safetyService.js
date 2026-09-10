// ==========================================================================
// IND TRAVEL — Safety Guardian Service Layer
// ==========================================================================

const SafetyService = {
    async getSafetyInformation(location) {
        const response = await ApiClient.post('safety/info', { location });

        if (response.status === 'success' && !response.demo_mode && response.result) {
            return { source: 'live', data: response.result };
        }

        return { source: 'demo', data: null };
    },

    async getNearbyEmergencyServices(location) {
        const response = await ApiClient.post('safety/emergency-services', { location });

        if (response.status === 'success' && !response.demo_mode && response.result) {
            return { source: 'live', data: response.result };
        }

        return { source: 'demo', data: null };
    }
};

window.SafetyService = SafetyService;
