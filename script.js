const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userId = (input.value || "").trim();

  resultsEl.innerHTML = "";
  statusEl.textContent = "";

  if (!userId) {
    statusEl.textContent = "Write an ID between 1 and 10.";
    input.focus();
    return;
  }

  btn.disabled = true;
  statusEl.textContent = "Loading…";

  try {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!resp.ok) throw new Error("Cannot find user.");
    const data = await resp.json();

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${data.name}</h3>
      <p class="kv"><strong>Usuario:</strong> @${data.username}</p>
      <p class="kv"><strong>Email:</strong> ${data.email}</p>
      <p class="kv"><strong>Ciudad:</strong> ${data.address.city}</p>
      <p class="kv"><strong>Compañía:</strong> ${data.company.name}</p>
      <p class="kvl"><strong>Web:</strong>  <a class="web-link" href="https://${data.website}" target="_blank" rel="noreferrer">
      ${data.website}
    </a></p>
    `;
    resultsEl.appendChild(card);
    statusEl.textContent = "Here it is!";
  } catch (err) {
    statusEl.textContent = "";
    resultsEl.innerHTML = `<p class="card" style="border-color:#5d1b1b;color:#ffdede;background:#1b0f10;">⚠️ Error: ${err.message}</p>`;
  } finally {
    btn.disabled = false;
  }
});

