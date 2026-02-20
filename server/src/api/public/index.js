async function prepareHit(method, url) {
  const reqPanel = document.getElementById("request-panel");
  const resEmpty = document.getElementById("response-empty");
  const resPanel = document.getElementById("response-panel");
  const methodEl = document.getElementById("request-method");
  const urlInput = document.getElementById("request-url-input");
  const sendBtn = document.getElementById("send-btn");
  const body = document.getElementById("response-body");
  const status = document.getElementById("response-status");

  resEmpty.classList.add("hidden");
  reqPanel.classList.add("visible");
  resPanel.classList.remove("visible"); // Hide response panel until 'Send' is clicked

  methodEl.textContent = method;
  methodEl.className = `badge ${method}`;
  urlInput.value = url;
  status.textContent = "";

  const onSend = async () => {
    resPanel.classList.add("visible"); // Show response panel on send
    body.textContent = "Loading…";
    body.className = "loading";
    status.textContent = "…";
    status.style.color = "#64748b";

    try {
      const currentUrl = urlInput.value;
      const res = await fetch(currentUrl, { method });
      const text = await res.text();

      let display;
      try {
        display = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        display = text;
      }

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
  };

  sendBtn.onclick = onSend;
  urlInput.onkeydown = (e) => {
    if (e.key === "Enter") {
      onSend();
    }
  };
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

  // Clear existing (if any)
  container.innerHTML = "";

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
      a.onclick = () => prepareHit(ep.method, ep.path);

      ul.appendChild(epFragment);
    });

    container.appendChild(groupFragment);
  });
}

window.addEventListener("DOMContentLoaded", init);
