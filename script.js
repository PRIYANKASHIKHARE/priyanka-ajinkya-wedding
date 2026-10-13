// Personalise these settings before publishing.
const WEDDING_DATE = new Date("2026-12-31T10:00:00+05:30"); // Change time if needed.
const RSVP_EMAIL = "your-email@example.com"; // Replace with your chosen RSVP email.
const MAPS_URL = ""; // Example: "https://maps.google.com/?q=Your+Venue+Name+City"

const fields = {days: document.querySelector("#days"), hours: document.querySelector("#hours"), minutes: document.querySelector("#minutes"), seconds: document.querySelector("#seconds")};
function updateCountdown() {
  const left = WEDDING_DATE.getTime() - Date.now();
  if (left <= 0) {
    Object.values(fields).forEach(el => el.textContent = "0");
    document.querySelector(".countdown h2").textContent = "Today is our special day!";
    return;
  }
  fields.days.textContent = Math.floor(left / 86400000);
  fields.hours.textContent = Math.floor((left % 86400000) / 3600000);
  fields.minutes.textContent = Math.floor((left % 3600000) / 60000);
  fields.seconds.textContent = Math.floor((left % 60000) / 1000);
}
updateCountdown();
setInterval(updateCountdown, 1000);

const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false");
}));

const map = document.querySelector("#map-link");
if (MAPS_URL) { map.href = MAPS_URL; map.textContent = "Open venue in Google Maps ↗"; }
else map.addEventListener("click", e => { e.preventDefault(); alert("Add your confirmed venue and Google Maps URL in script.js first."); });

document.querySelector("#rsvp-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.querySelector("#guest-name").value.trim();
  const attendance = document.querySelector("#attendance").value;
  const message = document.querySelector("#guest-message").value.trim();
  if (RSVP_EMAIL === "your-email@example.com") {
    document.querySelector("#form-status").textContent = "Before using RSVP, replace your-email@example.com in script.js with your chosen email address.";
    return;
  }
  const subject = encodeURIComponent(`Wedding RSVP — ${name}`);
  const body = encodeURIComponent(`Hello Priyanka and Ajinkya,\n\nName: ${name}\nRSVP: ${attendance}\nMessage: ${message || "No additional message"}\n\nBest wishes!`);
  window.location.href = `mailto:${RSVP_EMAIL}?subject=${subject}&body=${body}`;
});
