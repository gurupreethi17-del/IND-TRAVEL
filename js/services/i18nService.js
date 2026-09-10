// ==========================================================================
// IND TRAVEL — Multilingual Translation & Assistant Service Layer
// ==========================================================================

const I18nService = {
    async translateText(text, targetLang) {
        const response = await ApiClient.post('translate', { text, targetLang });

        if (response.status === 'success' && !response.demo_mode && response.result) {
            return { source: 'live', data: response.result };
        }

        return { source: 'demo', data: null };
    },

    async travelAssistantResponse(userMessage, language) {
        const response = await ApiClient.post('ai/assistant', { message: userMessage, language });

        if (response.status === 'success' && !response.demo_mode && response.result) {
            return { source: 'live', data: response.result };
        }

        return { source: 'demo', data: null };
    }
};

window.I18nService = I18nService;
