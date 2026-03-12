import { initAppLocale } from "./desktop/app-locale.js";
import { initBlogBrowser } from "./desktop/blog-browser.js";
import { initClock } from "./desktop/clock.js";
import { initDockMagnification } from "./desktop/dock.js";
import { initJikeArchive } from "./desktop/jike-archive.js";
import { initDesktopSettings } from "./desktop/settings.js";
import { initWindowManager } from "./desktop/window-manager.js";
import { initCatInteraction } from "./desktop/cat-interaction.js";

initWindowManager();
initBlogBrowser();
initAppLocale();
initDockMagnification();
initClock();
initJikeArchive();
initDesktopSettings();
initCatInteraction();
