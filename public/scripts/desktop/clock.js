import { getPreferredBlogLocale } from "../locale-preference.js";

export function initClock() {
  const clock = document.querySelector("#clock");
  const widgetTime = document.querySelector("[data-widget-time]");
  const widgetDate = document.querySelector("[data-widget-date]");

  const updateClock = () => {
    const now = new Date();
    const locale = getPreferredBlogLocale();
    const localeTag = locale === "en" ? "en-US" : "zh-CN";
    const timeText = now.toLocaleTimeString(localeTag, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    const menuDateText = now.toLocaleDateString(localeTag, {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
    const dateText = now.toLocaleDateString(localeTag, {
      weekday: "long",
      month: "long",
      day: "numeric"
    });

    if (clock) clock.textContent = `${menuDateText} ${timeText}`;
    if (widgetTime) widgetTime.textContent = timeText;
    if (widgetDate) widgetDate.textContent = dateText;
  };

  updateClock();
  setInterval(updateClock, 1000);
}
