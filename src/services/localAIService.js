// Local AI Service (Rule-based Contextual Chatbot)
// Simulated delay to feel like a real AI "thinking"
const simulateNetworkDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const createLocalSession = (museumName, context) => {
    return {
        museumName,
        context
    };
};
export const sendMessageToLocalAI = async (session, message) => {
    await simulateNetworkDelay(600 + Math.random() * 800); // 0.6 - 1.4 second delay
    const msg = message.toLowerCase();
    const { museumName, context } = session;
    // 1. Greetings
    if (/\b(hi|hello|hey|greetings|start)\b/.test(msg)) {
        return `Hello! I am your digital guide for the ${museumName}. Ask me about the exhibits, history, or visitor info!`;
    }
    // 2. Operational Questions (Static Knowledge)
    if (msg.match(/time|open|close|hours|when/)) {
        return `${museumName} is open from 10:30 AM to 5:30 PM, Tuesday through Sunday. Closed on Mondays.`;
    }
    if (msg.match(/ticket|price|cost|entry|fee/)) {
        return "Entry fee is ₹20 for Indian citizens and ₹200 for foreign tourists. Camera fees are extra.";
    }
    if (msg.match(/location|where|address|reach/)) {
        return `${museumName} is located in the scenic Shyamla Hills area of Bhopal. You can easily reach here by cab or auto-rickshaw.`;
    }
    if (msg.match(/food|eat|cafe|canteen/)) {
        return "Eating is not allowed inside the galleries. There is a cafeteria near the main entrance.";
    }
    if (msg.match(/photo|camera|picture/)) {
        return "Photography is allowed for personal use upon purchasing a camera ticket. Flash and tripods are generally prohibited.";
    }
    // 3. Contextual Retrieval (Simulated RAG)
    // We split the context (description + highlights) into sentences and check for keyword overlaps.
    const keywords = msg.split(' ').filter(w => w.length > 4); // Filter out small words
    if (keywords.length > 0) {
        const sentences = context.split('. ');
        const bestMatch = sentences.find(sentence => {
            const lowerSentence = sentence.toLowerCase();
            return keywords.some(keyword => lowerSentence.includes(keyword));
        });
        if (bestMatch) {
            return `Regarding that: ${bestMatch}.`;
        }
    }
    // 4. Specific Museum Queries (Hardcoded fallback nuances)
    if (museumName.includes("Tribal") && (msg.includes("art") || msg.includes("paint"))) {
        return "The museum features authentic Gond, Bhil, and Rathwa paintings that depict tribal mythology and daily life.";
    }
    if (museumName.includes("State Museum") && msg.includes("old")) {
        return "We house some of the oldest fossils and sculptures in the region, dating back centuries.";
    }
    // 5. Fallback
    return `I'm focusing on the ${museumName} collection. Could you rephrase your question? I can tell you about the highlights, timings, or specific artifacts mentioned in the guide.`;
};
