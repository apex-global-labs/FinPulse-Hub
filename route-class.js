"use strict";
const routeParams = new URLSearchParams(window.location.search);
document.documentElement.classList.add(routeParams.has("tool") ? "tool-route" : "home-route");
