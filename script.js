document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.querySelector(".theme-toggle");
  const storedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");

  const applyTheme = (theme) => {
    body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  };

  document.title = "Sinter Studio";
  applyTheme(initialTheme);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
      toggle.classList.remove("is-animating");
      void toggle.offsetWidth;
      toggle.classList.add("is-animating");
      applyTheme(nextTheme);
    });

    toggle.addEventListener("animationend", () => {
      toggle.classList.remove("is-animating");
    });
  }
});
