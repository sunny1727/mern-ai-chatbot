const express = require('express');
const Chat = require('../models/Chat');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // TERMINAL LOG: User ka message aaya
    console.log("-----------------------------------------");
    console.log("📩 NEW MESSAGE FROM USER:", prompt);

    try {
        if (!apiKey) {
            console.error("❌ ERROR: API Key is missing in .env!");
            return res.status(500).json({ error: "API Key missing" });
        }

        // Google API call
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            }
        );

        const data = await response.json();

        // TERMINAL LOG: Google ne koi error diya kya?
        if (data.error) {
            console.error("❌ GOOGLE API ERROR:", data.error.message);
            return res.status(500).json({ error: data.error.message });
        }

        const aiResponse = data.candidates[0].content.parts[0].text;

        // TERMINAL LOG: AI ne reply de diya
        console.log("✅ AI RESPONSE SUCCESSFUL!");
        // console.log("🤖 AI SAID:", aiResponse.substring(0, 50) + "..."); // Pehle 50 characters

        // Database me save karna
        const newChat = await Chat.create({ userId: req.user.id, prompt, response: aiResponse });
        console.log("💾 CHAT SAVED TO MONGODB");

        res.json(newChat);

    } catch (error) {
        // TERMINAL LOG: Koi system crash ya catch error
        console.error("🔥 CRITICAL BACKEND ERROR:", error.message);
        res.status(500).json({ error: "API Error" });
    }
});

// History fetch log
router.get('/history', authMiddleware, async (req, res) => {
    try {
        const history = await Chat.find({ userId: req.user.id }).sort({ createdAt: 1 });
        console.log(`📜 FETCHED ${history.length} MESSAGES FOR USER:`, req.user.id);
        res.json(history);
    } catch (err) {
        console.error("❌ HISTORY FETCH FAILED:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Clear history log
router.delete('/clear', authMiddleware, async (req, res) => {
    try {
        await Chat.deleteMany({ userId: req.user.id });
        console.log("🗑️ CHAT HISTORY CLEARED FOR USER:", req.user.id);
        res.json({ message: "Cleared" });
    } catch (err) {
        console.error("❌ CLEAR FAILED:", err.message);
        res.status(500).json({ error: "Failed" });
    }
});

module.exports = router;