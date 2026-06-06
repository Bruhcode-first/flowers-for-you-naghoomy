onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);

  // ---- floating hearts ----
  const heartsBox = document.getElementById("hearts");
  const heartChars = ["\u2764", "\uD83D\uDC95", "\uD83D\uDC96", "\uD83C\uDF38", "\uD83D\uDC9D"];
  if (heartsBox) {
    for (let i = 0; i < 16; i++) {
      const h = document.createElement("span");
      h.className = "heart";
      h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
      h.style.left = Math.random() * 100 + "vw";
      h.style.fontSize = 1.6 + Math.random() * 2.6 + "vmin";
      h.style.animationDuration = 7 + Math.random() * 8 + "s";
      h.style.animationDelay = Math.random() * 10 + "s";
      heartsBox.appendChild(h);
    }
  }

  // ---- envelope opens the letter ----
  const mail = document.getElementById("mail");
  const overlay = document.getElementById("letterOverlay");
  const closeBtn = document.getElementById("letterClose");

  const openLetter = () => overlay && overlay.classList.add("open");
  const closeLetter = () => overlay && overlay.classList.remove("open");

  if (mail) {
    mail.addEventListener("click", openLetter);
    mail.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLetter();
      }
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", closeLetter);
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeLetter();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLetter();
  });

  // ---- private visit counter ----
  const COUNTER_KEY = "forya-enjy-yousef-visits";
  const counterHit = `https://countapi.mileshilliard.com/api/v1/hit/${COUNTER_KEY}`;
  const counterGet = `https://countapi.mileshilliard.com/api/v1/get/${COUNTER_KEY}`;
  const SESSION_KEY = "forya_visit_recorded";

  const recordVisit = async () => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    try {
      await fetch(counterHit);
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch (_) {
      /* offline or API down — skip silently */
    }
  };

  const fetchVisitCount = async () => {
    try {
      const res = await fetch(counterGet);
      const data = await res.json();
      return typeof data.value === "number" ? data.value : null;
    } catch (_) {
      return null;
    }
  };

  recordVisit();

  const visitSecret = document.getElementById("visitSecret");
  const visitStats = document.getElementById("visitStats");
  const visitCountEl = document.getElementById("visitCount");
  let secretTaps = 0;
  let secretTimer = null;

  const hideVisitStats = () => visitStats && visitStats.classList.remove("visible");

  const showVisitStats = async () => {
    if (!visitStats || !visitCountEl) return;
    visitCountEl.textContent = "…";
    visitStats.classList.add("visible");
    visitStats.setAttribute("aria-hidden", "false");

    const count = await fetchVisitCount();
    visitCountEl.textContent = count !== null ? String(count) : "?";

    clearTimeout(showVisitStats._hideTimer);
    showVisitStats._hideTimer = setTimeout(hideVisitStats, 8000);
  };

  if (visitSecret) {
    visitSecret.addEventListener("click", () => {
      secretTaps += 1;
      clearTimeout(secretTimer);
      secretTimer = setTimeout(() => {
        secretTaps = 0;
      }, 2000);

      if (secretTaps >= 5) {
        secretTaps = 0;
        showVisitStats();
      }
    });
  }

  if (visitStats) {
    visitStats.addEventListener("click", hideVisitStats);
  }
};
