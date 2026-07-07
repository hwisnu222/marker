// ==UserScript==
// @name        Marker - A bookmark client
// @namespace   Violentmonkey Scripts
// @icon        data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZvbGRlci1ib29rbWFyay1pY29uIGx1Y2lkZS1mb2xkZXItYm9va21hcmsiPjxwYXRoIGQ9Ik0xMiA2djhsMy0zIDMgM1Y2Ii8+PHBhdGggZD0iTTIwIDIwYTIgMiAwIDAgMCAyLTJWOGEyIDIgMCAwIDAtMi0yaC03LjlhMiAyIDAgMCAxLTEuNjktLjlMOS42IDMuOUEyIDIgMCAwIDAgNy45MyAzSDRhMiAyIDAgMCAwLTIgMnYxM2EyIDIgMCAwIDAgMiAyeiIvPjwvc3ZnPg==
// @version     1.0.2
//
// @match       *://*/*
// @grant       GM_xmlhttpRequest
// @grant       GM_notification
//
// @author      wisnubox
// @description
// ==/UserScript==

(function () {
  const successIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;
  const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
  const bookmarkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark-icon lucide-bookmark"><path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"/></svg>`;

  const addButton = (obs) => {
    const target = document.querySelector(".container-marker");
    if (!target) {
      console.log("button added!");
      obs.disconnect();
      let container = document.createElement("div");

      container.className = "container-marker";
      container.style.display = "flex";
      container.style.justifyContent = "center";
      container.style.alignItems = "center";
      container.style.position = "fixed";
      container.style.top = "5em";
      container.style.right = "1em";
      container.style.zIndex = 1000;

      let button = document.createElement("button");
      button.innerHTML = bookmarkIcon;
      button.style.padding = "0.8em";
      button.style.background = "#000000";
      button.style.color = "#ffffff";
      button.style.borderRadius = "5px";
      button.style.border = "none";
      button.style.outline = "none";

      container.appendChild(button);

      document.body.append(container);

      button.addEventListener("click", function () {
        const title = document.title;
        const url = document.location.href;
        const id = new Date().getTime();

        const body = {
          id: id,
          jsonrpc: "2.0",
          method: "add_url",
          params: [title, url],
        };

        console.log(body);

        GM_xmlhttpRequest({
          method: "POST",
          url: "http://127.0.0.1:6644",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(body),
          onload: (res) => {
            try {
              const data = JSON.parse(res.responseText);
              console.log(data);

              if (data?.error) {
                button.innerHTML = errorIcon;
                return;
              }

              button.innerHTML = successIcon;
            } catch (data) {
              alert("can't parse response");
            } finally {
              setTimeout(() => {
                button.innerHTML = bookmarkIcon;
              }, 2000);
            }
          },
          onerror: (res) => {
            alert("can't connect to bookmark server");
          },
        });
      });
    }
  };

  const observer = new MutationObserver((mutation, obs) => {
    console.log("dom is change");
    addButton(obs);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
