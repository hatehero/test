export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js", { scope: "/" })
      .then((registration) => console.info("[PWA] registered", registration.scope))
      .catch((error) => console.error("[PWA] registration failed", error));
  });
}
