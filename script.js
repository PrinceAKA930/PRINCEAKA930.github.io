const platforms = {
  "GitHub": "https://github.com/",
  "Reddit": "https://www.reddit.com/user/",
  "Twitter/X": "https://twitter.com/",
  "Instagram": "https://www.instagram.com/",
  "Medium": "https://medium.com/@"
};

async function checkProfile(platform, baseUrl, username) {
  const url = baseUrl + username;
  const proxy = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);

  try {
    const res = await fetch(proxy);
    if (res.ok) return true;
  } catch (e) {
    return false;
  }
  return false;
}

async function scan() {
  const username = document.getElementById("username").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!username) {
    alert("Enter a username");
    return;
  }

  let foundCount = 0;

  for (const [platform, url] of Object.entries(platforms)) {
    const exists = await checkProfile(platform, url, username);

    const div = document.createElement("div");
    div.className = "result " + (exists ? "found" : "notfound");
    div.innerHTML = `<strong>${platform}</strong>: ${exists ? "FOUND" : "NOT FOUND"}`;

    if (exists) foundCount++;
    resultsDiv.appendChild(div);
  }

  // Risk logic
  const risk = foundCount >= 4 ? "HIGH" : foundCount >= 2 ? "MEDIUM" : "LOW";

  const riskDiv = document.createElement("div");
  riskDiv.className = "result";
  riskDiv.style.background = "#333";
  riskDiv.innerHTML = `<strong>Risk Level:</strong> ${risk}`;
  resultsDiv.appendChild(riskDiv);
}
