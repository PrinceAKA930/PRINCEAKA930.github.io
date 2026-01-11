const platforms = [
  {
    name: "GitHub",
    check: (u) => `https://github.com/${u}.png`
  },
  {
    name: "Reddit",
    check: (u) => `https://www.reddit.com/user/${u}/about.json`
  },
  {
    name: "Instagram",
    check: (u) => `https://www.instagram.com/${u}/profile_pic.jpg`
  }
];

function checkImage(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function scan() {
  const username = document.getElementById("username").value.trim();
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (!username) {
    alert("Enter a username");
    return;
  }

  let found = 0;

  for (const p of platforms) {
    let exists = false;

    if (p.name === "Reddit") {
      try {
        const res = await fetch(p.check(username));
        exists = res.ok;
      } catch {
        exists = false;
      }
    } else {
      exists = await checkImage(p.check(username));
    }

    const div = document.createElement("div");
    div.className = "result " + (exists ? "found" : "notfound");
    div.innerHTML = `<strong>${p.name}</strong>: ${exists ? "FOUND" : "NOT FOUND"}`;

    if (exists) found++;
    results.appendChild(div);
  }

  const risk =
    found >= 3 ? "HIGH" :
    found === 2 ? "MEDIUM" :
    "LOW";

  const riskDiv = document.createElement("div");
  riskDiv.className = "result";
  riskDiv.style.background = "#222";
  riskDiv.innerHTML = `<strong>Risk Level:</strong> ${risk}`;
  results.appendChild(riskDiv);
    }
