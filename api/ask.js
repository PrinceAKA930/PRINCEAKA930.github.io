export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { question, subject, classLevel } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question required" });
    }

    const prompt = `
You are a helpful school teacher.
Class: ${classLevel}
Subject: ${subject}

Question:
${question}

Give a clear step-by-step answer.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No answer generated.";

    res.status(200).json({ answer });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
