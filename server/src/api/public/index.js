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

async function init() {
  try {
    const res = await fetch("/api/__explore");
    const groups = await res.json();
    renderRoutes(groups);
  } catch (err) {
    console.error("Failed to load routes", err);
  }
}

function renderRoutes(groups) {
  const container = document.getElementById("endpoints-container");
  const groupTemplate = document.getElementById("group-template");
  const endpointTemplate = document.getElementById("endpoint-template");

  if (!container || !groupTemplate || !endpointTemplate) return;

  groups.forEach((group) => {
    const groupFragment = groupTemplate.content.cloneNode(true);
    groupFragment.querySelector(".group-label").textContent = group.name;
    const ul = groupFragment.querySelector("ul");

    group.endpoints.forEach((ep) => {
      const epFragment = endpointTemplate.content.cloneNode(true);
      const a = epFragment.querySelector("a");
      const badge = epFragment.querySelector(".badge");
      const pathSpan = epFragment.querySelector(".path");

      badge.textContent = ep.method;
      badge.classList.add(ep.method);
      pathSpan.textContent = ep.path;
      a.onclick = () => hit(ep.method, ep.path);

      ul.appendChild(epFragment);
    });

    container.appendChild(groupFragment);
  });
}

window.addEventListener("DOMContentLoaded", init);
