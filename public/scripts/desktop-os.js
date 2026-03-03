import { initBlogBrowser } from "./desktop/blog-browser.js";
import { initClock } from "./desktop/clock.js";
import { initDockMagnification } from "./desktop/dock.js";
import { initWindowManager } from "./desktop/window-manager.js";

initWindowManager();
initBlogBrowser();
initDockMagnification();
initClock();
