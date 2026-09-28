import apiClient from './api';

/**
 * Service layer for the Analytics Assistant chat feature.
 *
 * The frontend never talks to OpenAI (or any LLM provider) directly and
 * never stores an API key. Every question is forwarded to FastAPI, which is
 * responsible for calling the LLM server-side and returning a plain answer.
 *
 * PLACEHOLDER CONTRACT: POST /api/ai/customer-chat is assumed per the brief.
 * Update the path below if your backend exposes a different route.
 */

const aiService = {
  /**
   * @param {{ question: string, chatHistory: Array<{ role: 'user'|'assistant', content: string }> }} params
   * @returns {Promise<{ answer: string, insights?: string | null }>}
   */
  askCustomerAnalyticsQuestion: ({ question, chatHistory }) =>
    apiClient
      .post('/api/ai/customer-chat', {
        question,
        chat_history: chatHistory,
      })
      .then((res) => {return res.data}),

  askProductAnalyticsQuestion: ({ question, chatHistory }) =>
    apiClient
      .post('/api/ai/product-chat', {
        question,
        chat_history: chatHistory,
      })
      .then((res) => {console.log(res);return res.data}),
};

export default aiService;
