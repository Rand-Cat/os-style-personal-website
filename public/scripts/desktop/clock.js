export function initClock() {
  const clock = document.querySelector("#clock");
  const widgetTime = document.querySelector("[data-widget-time]");
  const widgetDate = document.querySelector("[data-widget-date]");

  const updateClock = () => {
    const now = new Date();
    const timeText = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    const dateText = now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    });

    if (clock) clock.textContent = timeText;
    if (widgetTime) widgetTime.textContent = timeText;
    if (widgetDate) widgetDate.textContent = dateText;
  };

  updateClock();
  setInterval(updateClock, 1000);
}
