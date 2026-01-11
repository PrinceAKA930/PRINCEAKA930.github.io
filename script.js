async function getAnswer() {
  const question = document.getElementById("question").value;
  const classLevel = document.getElementById("class").value;
  const subject = document.getElementById("subject").value;
  const output = document.getElementById("answer");

  output.innerHTML = "⏳ Thinking...";

  try {
    const res = await fetch("/.netlify/functions/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, classLevel, subject }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    output.innerHTML = data.answer;
  } catch (err) {
    output.innerHTML = "❌ Error: " + err.message;
  }
}
