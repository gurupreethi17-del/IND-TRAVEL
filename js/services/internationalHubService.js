// ==========================================================================
// IND TRAVEL — International Tourist Assistance Hub Service Layer
// ==========================================================================

const InternationalHubService = {
    async convertCurrency(fromCurrency, toCurrency, amount) {
        const response = await ApiClient.post('international/currency', { fromCurrency, toCurrency, amount });
        if (response.status === 'success' && !response.demo_mode && response.result) {
            return { source: 'live', data: response.result };
        }
        return { source: 'demo', data: null };
    }
};

window.InternationalHubService = InternationalHubService;
