async function hit(method, url) {
  const panel = document.getElementById("response-panel");
  const empty = document.getElementById("response-empty");
  const status = document.getElementById("response-status");
  const urlEl = document.getElementById("response-url");
  const body = document.getElementById("response-body");

  // Show panel, hide empty state
  panel.classList.add("visible");
  empty.classList.add("hidden");

  status.textContent = "…";
  status.style.color = "#64748b";
  urlEl.textContent = `${method} ${url}`;
  body.textContent = "Loading…";
  body.className = "loading";

  try {
    const res = await fetch(url, { method });
    const text = await res.text();

    let display = text;
    try {
      display = JSON.stringify(JSON.parse(text), null, 2);
    } catch {}

    status.textContent = `${res.status} ${res.statusText}`;
    status.style.color = res.ok ? "#4ade80" : "#f87171";
    body.textContent = display;
    body.className = "";
  } catch (err) {
    status.textContent = "Error";
    status.style.color = "#f87171";
    body.textContent = String(err);
    body.className = "";
  }
}
