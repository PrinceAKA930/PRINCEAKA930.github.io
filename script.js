const API_KEY = "AIzaSyAc897Ye_iRRHHxwqjcu8m6soWxhRjpBxc";

async function solveProblem() {
  const question = document.getElementById("question").value;
  const studentClass = document.getElementById("class").value;
  const subject = document.getElementById("subject").value;
  const answerBox = document.getElementById("answer");

  if (!question.trim()) {
    answerBox.textContent = "❌ Please enter a question first.";
    return;
  }

  answerBox.textContent = "⏳ Studify is thinking...";

  const prompt = `
You are an expert school teacher.
Explain clearly in simple steps.

Student Class: ${studentClass}
Subject: ${subject}

Question:
${question}
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!data.candidates) {
      answerBox.textContent = "⚠️ No response from AI.";
      return;
    }

    answerBox.textContent =
      data.candidates[0].content.parts[0].text;

  } catch (error) {
    answerBox.textContent = "❌ Error connecting to AI.";
    console.error(error);
  }
}
