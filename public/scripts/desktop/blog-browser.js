export function initBlogBrowser() {
  const blogButtons = Array.from(document.querySelectorAll("[data-blog-target]"));
  const blogFrame = document.querySelector("[data-blog-frame]");
  const blogBrowser = document.querySelector("[data-blog-browser]");
  const blogBackButton = document.querySelector("[data-blog-back]");
  const blogLists = Array.from(document.querySelectorAll("[data-blog-list]"));
  const blogLocaleButtons = Array.from(document.querySelectorAll("[data-blog-locale-switch]"));
  const scrollLocks = Array.from(document.querySelectorAll("[data-scroll-lock]"));
  const blogCopy = {
    zh: { fallback: "/blog" },
    en: { fallback: "/blog/en" }
  };
  let blogLocale = "zh";
  const isMobile = () => window.matchMedia("(max-width: 980px)").matches;
  const blogBackHome = blogBackButton?.parentElement || null;
  const blogWindow = blogBrowser?.closest(".os-window") || null;

  const setMobileView = (view) => {
    if (!blogBrowser) return;
    if (!isMobile()) {
      blogBrowser.classList.remove("is-mobile-detail");
      blogWindow?.classList.remove("is-blog-detail");
      return;
    }
    blogBrowser.classList.toggle("is-mobile-detail", view === "detail");
    blogWindow?.classList.toggle("is-blog-detail", view === "detail");
  };

  const placeBackButton = () => {
    if (!blogBackButton || !blogBrowser) return;
    const blogWindow = blogBrowser.closest(".os-window");
    const titlebar = blogWindow?.querySelector(".os-window__titlebar");

    if (isMobile()) {
      if (titlebar && blogBackButton.parentElement !== titlebar) {
        titlebar.prepend(blogBackButton);
      }
      return;
    }

    if (blogBackHome && blogBackButton.parentElement !== blogBackHome) {
      blogBackHome.prepend(blogBackButton);
    }
  };

  const setBlogTarget = (href) => {
    if (!href || !blogFrame) return;
    blogFrame.setAttribute("src", href);
    if (isMobile()) setMobileView("detail");
    blogButtons.forEach((button) => {
      const matchesLocale = button.getAttribute("data-blog-locale") === blogLocale;
      button.classList.toggle(
        "is-active",
        matchesLocale && button.getAttribute("data-blog-target") === href
      );
    });
  };

  const setBlogLocale = (locale) => {
    if (locale !== "zh" && locale !== "en") return;
    blogLocale = locale;
    localStorage.setItem("blog-locale", locale);

    blogLists.forEach((list) => {
      const matches = list.getAttribute("data-blog-list") === locale;
      if (matches) {
        list.removeAttribute("hidden");
      } else {
        list.setAttribute("hidden", "");
      }
    });

    blogLocaleButtons.forEach((button) => {
      button.classList.toggle("is-active", button.getAttribute("data-blog-locale-switch") === locale);
    });

    const currentHref = blogFrame?.getAttribute("src") || "";
    const localeItems = blogButtons.filter(
      (button) => button.getAttribute("data-blog-locale") === locale
    );
    const hasCurrentMatch = localeItems.some(
      (button) => button.getAttribute("data-blog-target") === currentHref
    );
    const nextHref = hasCurrentMatch
      ? currentHref
      : localeItems[0]?.getAttribute("data-blog-target") || blogCopy[locale].fallback;

    setBlogTarget(nextHref);
    if (isMobile()) setMobileView("list");
  };

  blogButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const href = button.getAttribute("data-blog-target");
      if (href) setBlogTarget(href);
    });
  });

  blogLocaleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const locale = button.getAttribute("data-blog-locale-switch");
      if (locale) setBlogLocale(locale);
    });
  });

  blogBackButton?.addEventListener("click", () => {
    setMobileView("list");
  });

  window.addEventListener("resize", () => {
    setMobileView("list");
    placeBackButton();
  });

  scrollLocks.forEach((scrollEl) => {
    scrollEl.addEventListener(
      "wheel",
      (event) => {
        const target = event.currentTarget;
        if (!(target instanceof HTMLElement)) return;
        if (target.scrollHeight <= target.clientHeight) return;

        const scrollingUp = event.deltaY < 0;
        const scrollingDown = event.deltaY > 0;
        const atTop = target.scrollTop <= 0;
        const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 1;

        event.stopPropagation();

        if ((scrollingUp && atTop) || (scrollingDown && atBottom)) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
  });

  setBlogLocale(localStorage.getItem("blog-locale") === "en" ? "en" : "zh");
  if (isMobile()) setMobileView("list");
  placeBackButton();
}
