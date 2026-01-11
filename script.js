async function solveProblem() {
  const question = document.getElementById("question").value;
  const studentClass = document.getElementById("class").value;
  const subject = document.getElementById("subject").value;
  const answerBox = document.getElementById("answer");

  if (!question.trim()) {
    answerBox.textContent = "❌ Please enter a question.";
    return;
  }

  answerBox.textContent = "⏳ Studify is thinking...";

  try {
    const response = await fetch("api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        studentClass,
        subject
      })
    });

    const data = await response.json();
    answerBox.textContent =
      data.candidates[0].content.parts[0].text;

  } catch (err) {
    answerBox.textContent = "⚠️ Server error.";
  }
}
