(function () {
  var KEY = "gb-theme";
  var root = document.documentElement;
  var saved = localStorage.getItem(KEY);
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  function sync(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      var toDark = theme === "light";
      var label = toDark ? "Switch to dark theme" : "Switch to light theme";
      btn.setAttribute("aria-label", label);
      var tip = btn.querySelector(".gb-tooltip");
      if (tip) tip.textContent = label;
    });
  }

  sync(root.getAttribute("data-theme") || "dark");

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);
    sync(next);
  });
})();
