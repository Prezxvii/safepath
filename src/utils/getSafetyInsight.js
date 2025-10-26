import { b64EncodeUnicode } from './b64EncodeUnicode';

const MODEL_ID = 'mistralai/mistral-small-3.2-24b-instruct:free';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MAX_TOKENS = 800; 

/**
 * Fetches a safety insight from the AI model based on a user's scenario and persona.
 *
 * @param {string} userName - The name of the user (or placeholder for portfolio).
 * @param {string} safetyScenario - The user's specific query (e.g., 'Safest route from P.S. 1 to the A train').
 * @param {string} persona - The AI's role (e.g., 'parent', 'teacher', 'teenager').
 * @param {string} openRouterKey - The OpenRouter API key for authentication.
 * @returns {Promise<string>} - A promise that resolves to the AI's safety insight text.
 */
export async function getSafetyInsight(
  userName, // Still required for the prompt context
  safetyScenario,
  persona,
  openRouterKey
) {
  // 1. Construct the System Prompt - NOW FOCUSED ON NYC SAFETY
  const systemPrompt = `You are SafePath AI, a safety expert specializing in NYC school logistics, student transportation, and general youth safety planning.
    Your response MUST be no more than 4 paragraphs long.
    
    INSTRUCTIONS:
    1. Adopt the tone and perspective of a safety expert for the target persona: '${persona}'. For example, if the persona is 'parent', use a reassuring and protective tone focused on logistics. If the persona is 'teenager', use a relatable and practical tone focused on autonomy and smart decisions.
    2. Analyze the following scenario or query: "${safetyScenario}".
    3. Provide a clear and concise safety insight based ONLY on general NYC safety best practices, using hypothetical data or common NYC street knowledge (mentioning boroughs, subway lines, or schools is encouraged for realism).
    4. Provide actionable advice covering the following points:
        - **Primary Concern:** Briefly state the main safety concern related to the query.
        - **Logistical Insight:** Offer 1-2 specific, actionable suggestions for transport/timing/location.
        - **Precautionary Measure:** Offer 1 piece of general safety advice (e.g., 'Always use well-lit streets,' 'Use the NYPD Guardian App').
    5. Respond ONLY with the safety insight text. DO NOT include the persona in the final output.`;

  // 2. Prepare the API Payload (Rest of the function remains the same)
  const payload = {
    model: MODEL_ID,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Provide a safety insight for the NYC scenario: "${safetyScenario}"` },
    ],
    temperature: 0.7,
    max_tokens: MAX_TOKENS,
    title: b64EncodeUnicode('SafePath AI - NYC'), 
  };

  // 3. Make the API Call (Same as before)
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openRouterKey}`, 
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API request failed: ${response.status} - ${errorData.error.message}`
      );
    }

    const data = await response.json();
    const recommendation = data.choices[0].message.content.trim();
    return recommendation;

  } catch (error) {
    console.error('Error fetching safety insight:', error);
    return "I'm sorry, I couldn't connect to the AI service right now. The API may be unavailable. I'm here to help with your portfolio!";
  }
}