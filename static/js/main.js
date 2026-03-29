// Add your JavaScript here

// Lightbox — overlay appended to <body> to avoid position:fixed bug caused by
// CSS transform on <main> (fadeIn animation creates a new containing block).
(function () {
  var triggers = document.querySelectorAll("[data-lightbox-src]");
  if (!triggers.length) return;

  // Build overlay
  var overlay = document.createElement("div");
  overlay.style.cssText =
    "display:none;position:fixed;inset:0;width:100vw;height:100vh;background:rgba(0,0,0,0.85);z-index:200;align-items:center;justify-content:center;";

  var closeBtn = document.createElement("button");
  closeBtn.innerHTML = "&#x2715;";
  closeBtn.style.cssText =
    "position:absolute;top:1.25rem;right:1.5rem;background:#FFFF00;border:4px solid #000;font-family:'IBM Plex Mono',monospace;font-size:1rem;font-weight:700;line-height:1;padding:0.4rem 0.75rem;cursor:pointer;z-index:201;";

  var img = document.createElement("img");
  img.alt = "";
  img.style.cssText =
    "max-width:90vw;max-height:90vh;object-fit:contain;border:4px solid #000;display:block;";

  overlay.appendChild(closeBtn);
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  function open(src) {
    img.src = src;
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.style.display = "none";
    img.src = "";
    document.body.style.overflow = "";
  }

  triggers.forEach(function (el) {
    el.addEventListener("click", function () {
      open(el.dataset.lightboxSrc);
    });
  });

  closeBtn.addEventListener("click", close);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
