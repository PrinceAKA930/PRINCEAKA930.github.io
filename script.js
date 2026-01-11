const API_KEY = "AIzaSyBRzgBLdBvASrAhHUWGpOKbjkiMd1UA1e8";

async function askAI() {
  const question = document.getElementById("question").value;
  const subject = document.getElementById("subject").value;
  const classLevel = document.getElementById("class").value;
  const answerBox = document.getElementById("answer");

  if (!question) {
    answerBox.textContent = "❌ Please enter a question";
    return;
  }

  answerBox.textContent = "🤔 Thinking...";

  const prompt = `
You are a school teacher.
Class: ${classLevel}
Subject: ${subject}

Question:
${question}

Explain step by step.
`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await res.json();

    answerBox.textContent =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No response from AI";

  } catch (err) {
    answerBox.textContent = "🔥 Error: " + err.message;
  }
}
