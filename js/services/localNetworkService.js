// ==========================================================================
// IND TRAVEL — Verified Local Tourism Network Service Layer
// ==========================================================================

const LocalNetworkService = {
    async getVerifiedProviders() {
        const response = await ApiClient.get('local-network/providers');
        if (response.status === 'success' && !response.demo_mode && response.result) {
            return { source: 'live', data: response.result };
        }
        return { source: 'demo', data: null };
    }
};

window.LocalNetworkService = LocalNetworkService;
