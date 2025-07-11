/* eslint-disable quotes */
import Clipboard from "clipboard";

// Only run on /examples pages
if (window.location.pathname.startsWith("/examples")) {
  var pre = document.getElementsByTagName("pre");

  for (var i = 0; i < pre.length; ++i) {
    var element = pre[i];
    var mermaid = element.getElementsByClassName("language-mermaid")[0];

    if (mermaid == null) {
      element.insertAdjacentHTML(
        "afterbegin",
        `<button class="copy-btn">
          <svg class="copy-icon" width='11' height='13' viewBox='0 0 11 13' fill='#000311' xmlns='http://www.w3.org/2000/svg'><path d='M3.55 10.5C3.20556 10.5 2.91667 10.3833 2.68333 10.15C2.45 9.91667 2.33333 9.63333 2.33333 9.3V1.71667C2.33333 1.37222 2.45 1.08333 2.68333 0.85C2.91667 0.616667 3.20556 0.5 3.55 0.5H9.11667C9.45 0.5 9.73622 0.619333 9.97533 0.858C10.214 1.09711 10.3333 1.38333 10.3333 1.71667V9.3C10.3333 9.63333 10.214 9.91667 9.97533 10.15C9.73622 10.3833 9.45 10.5 9.11667 10.5H3.55ZM3.55 9.5H9.11667C9.18333 9.5 9.23622 9.48044 9.27533 9.44133C9.314 9.40267 9.33333 9.35555 9.33333 9.3V1.71667C9.33333 1.65 9.314 1.59711 9.27533 1.558C9.23622 1.51933 9.18333 1.5 9.11667 1.5H3.55C3.48333 1.5 3.43067 1.51933 3.392 1.558C3.35289 1.59711 3.33333 1.65 3.33333 1.71667V9.3C3.33333 9.35555 3.35289 9.40267 3.392 9.44133C3.43067 9.48044 3.48333 9.5 3.55 9.5ZM1.2 12.8333C0.866667 12.8333 0.583333 12.7167 0.35 12.4833C0.116667 12.25 0 11.9667 0 11.6333V3.66667C0 3.53333 0.0471112 3.41667 0.141333 3.31667C0.236 3.21667 0.355555 3.16667 0.5 3.16667C0.633333 3.16667 0.75 3.21667 0.85 3.31667C0.95 3.41667 1 3.53333 1 3.66667V11.6333C1 11.6889 1.01933 11.736 1.058 11.7747C1.09711 11.8138 1.14444 11.8333 1.2 11.8333H7.16667C7.3 11.8333 7.41667 11.8833 7.51667 11.9833C7.61667 12.0833 7.66667 12.2 7.66667 12.3333C7.66667 12.4778 7.61667 12.5971 7.51667 12.6913C7.41667 12.786 7.3 12.8333 7.16667 12.8333H1.2Z' fill="#000311"/></svg>
          <svg class="copy-icon-dark" width='11' height='13' viewBox='0 0 11 13' fill='white' xmlns='http://www.w3.org/2000/svg'><path d='M3.55 10.5C3.20556 10.5 2.91667 10.3833 2.68333 10.15C2.45 9.91667 2.33333 9.63333 2.33333 9.3V1.71667C2.33333 1.37222 2.45 1.08333 2.68333 0.85C2.91667 0.616667 3.20556 0.5 3.55 0.5H9.11667C9.45 0.5 9.73622 0.619333 9.97533 0.858C10.214 1.09711 10.3333 1.38333 10.3333 1.71667V9.3C10.3333 9.63333 10.214 9.91667 9.97533 10.15C9.73622 10.3833 9.45 10.5 9.11667 10.5H3.55ZM3.55 9.5H9.11667C9.18333 9.5 9.23622 9.48044 9.27533 9.44133C9.314 9.40267 9.33333 9.35555 9.33333 9.3V1.71667C9.33333 1.65 9.314 1.59711 9.27533 1.558C9.23622 1.51933 9.18333 1.5 9.11667 1.5H3.55C3.48333 1.5 3.43067 1.51933 3.392 1.558C3.35289 1.59711 3.33333 1.65 3.33333 1.71667V9.3C3.33333 9.35555 3.35289 9.40267 3.392 9.44133C3.43067 9.48044 3.48333 9.5 3.55 9.5ZM1.2 12.8333C0.866667 12.8333 0.583333 12.7167 0.35 12.4833C0.116667 12.25 0 11.9667 0 11.6333V3.66667C0 3.53333 0.0471112 3.41667 0.141333 3.31667C0.236 3.21667 0.355555 3.16667 0.5 3.16667C0.633333 3.16667 0.75 3.21667 0.85 3.31667C0.95 3.41667 1 3.53333 1 3.66667V11.6333C1 11.6889 1.01933 11.736 1.058 11.7747C1.09711 11.8138 1.14444 11.8333 1.2 11.8333H7.16667C7.3 11.8333 7.41667 11.8833 7.51667 11.9833C7.61667 12.0833 7.66667 12.2 7.66667 12.3333C7.66667 12.4778 7.61667 12.5971 7.51667 12.6913C7.41667 12.786 7.3 12.8333 7.16667 12.8333H1.2Z' fill="white"/></svg>
          <svg class="copy-success-icon" width='11' height='13' viewBox='0 0 11 13' fill='#2156f6' xmlns='http://www.w3.org/2000/svg'><path d='M4.5 8.5L2 6L1.5 6.5L4.5 9.5L9.5 4.5L9 4L4.5 8.5Z' fill='#2156f6'/></svg>
          <span class="copy-text">Copied!</span>
        </button>`
      );
    }
  }

  var clipboard = new Clipboard(".copy-btn", {
    target: function (trigger) {
      return trigger.nextElementSibling;
    },
  });

  clipboard.on("success", function (e) {
    /*
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
      */

    e.clearSelection();

    // Show success feedback
    const button = e.trigger;
    button.classList.add("copy-success");

    // Remove success state after 2 seconds
    setTimeout(() => {
      button.classList.remove("copy-success");
    }, 2000);
  });

  clipboard.on("error", function (e) {
    console.error("Action:", e.action);
    console.error("Trigger:", e.trigger);
  });
}
