async function getAnswer() {
  const question = document.getElementById("question").value;
  const classLevel = document.getElementById("class").value;
  const subject = document.getElementById("subject").value;

  const answerBox = document.getElementById("answer");
  answerBox.innerHTML = "⏳ Thinking...";

  try {
    const res = await fetch("/.netlify/functions/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, classLevel, subject })
    });

    const data = await res.json();

    if (data.answer) {
      answerBox.innerHTML = data.answer;
    } else {
      answerBox.innerHTML = "❌ No response from AI.";
    }
  } catch (e) {
    answerBox.innerHTML = "❌ Server error.";
  }
}
