export default async (req) => {
  if (req.method !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { question, classLevel, subject } = JSON.parse(req.body);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("API key missing");
    }

    const prompt = `Answer for Class ${classLevel} ${subject} student:\n${question}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        }),
      }
    );

    const data = await response.json();

    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No answer generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ answer }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
