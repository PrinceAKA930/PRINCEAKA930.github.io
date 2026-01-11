async function askAI() {
  const question = document.getElementById("question").value;
  const subject = document.getElementById("subject").value;
  const classLevel = document.getElementById("class").value;

  document.getElementById("answer").innerText = "Thinking...";

  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, subject, classLevel })
  });

  const data = await res.json();

  document.getElementById("answer").innerText =
    data.answer || data.error || "Something went wrong";
}
