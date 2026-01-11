export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "API key missing" });
  }

  try {
    const { question, subject, classLevel } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question missing" });
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Explain clearly for Class ${classLevel}, Subject ${subject}:\n${question}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await geminiRes.json();

    if (!data.candidates) {
      return res.status(500).json({
        error: "Gemini API failed",
        raw: data
      });
    }

    res.status(200).json({
      answer: data.candidates[0].content.parts[0].text
    });

  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      message: err.message
    });
  }
}
