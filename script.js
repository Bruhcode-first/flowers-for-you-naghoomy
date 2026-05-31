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
};
