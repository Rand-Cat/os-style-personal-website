import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const SYSTEM_CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function parseArgs(argv) {
  const args = {
    url: null,
    iterations: 3,
    pauseMs: 250,
    headless: true,
    screenshotDir: "output/web-game",
    actionsFile: null,
    actionsJson: null,
    click: null,
    clickSelector: null
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--url" && next) {
      args.url = next;
      i += 1;
    } else if (arg === "--iterations" && next) {
      args.iterations = parseInt(next, 10);
      i += 1;
    } else if (arg === "--pause-ms" && next) {
      args.pauseMs = parseInt(next, 10);
      i += 1;
    } else if (arg === "--headless" && next) {
      args.headless = next !== "0" && next !== "false";
      i += 1;
    } else if (arg === "--screenshot-dir" && next) {
      args.screenshotDir = next;
      i += 1;
    } else if (arg === "--actions-file" && next) {
      args.actionsFile = next;
      i += 1;
    } else if (arg === "--actions-json" && next) {
      args.actionsJson = next;
      i += 1;
    } else if (arg === "--click" && next) {
      const parts = next.split(",").map((value) => parseFloat(value.trim()));
      if (parts.length === 2 && parts.every((value) => Number.isFinite(value))) {
        args.click = { x: parts[0], y: parts[1] };
      }
      i += 1;
    } else if (arg === "--click-selector" && next) {
      args.clickSelector = next;
      i += 1;
    }
  }

  if (!args.url) throw new Error("--url is required");
  return args;
}

const buttonNameToKey = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  enter: "Enter",
  space: "Space",
  a: "KeyA",
  b: "KeyB"
};

function ensureDir(target) {
  fs.mkdirSync(target, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeVirtualTimeShim() {
  return `(() => {
    window.advanceTime = window.advanceTime || (async () => {});
  })();`;
}

async function getCanvasHandle(page) {
  const handle = await page.evaluateHandle(() => {
    let best = null;
    let bestArea = 0;
    for (const canvas of document.querySelectorAll("canvas")) {
      const area = (canvas.width || canvas.clientWidth || 0) * (canvas.height || canvas.clientHeight || 0);
      if (area > bestArea) {
        bestArea = area;
        best = canvas;
      }
    }
    return best;
  });
  return handle.asElement();
}

async function captureScreenshot(page, canvas, outPath) {
  let buffer = null;
  if (canvas) {
    try {
      buffer = await canvas.screenshot({ type: "png" });
    } catch {
      buffer = null;
    }
  }

  if (!buffer) {
    const bbox = canvas ? await canvas.boundingBox() : null;
    buffer = bbox
      ? await page.screenshot({ type: "png", clip: bbox, omitBackground: false })
      : await page.screenshot({ type: "png", omitBackground: false });
  }
  fs.writeFileSync(outPath, buffer);
}

async function doChoreography(page, canvas, steps) {
  for (const step of steps) {
    const buttons = new Set(step.buttons || []);
    for (const button of buttons) {
      if (button === "left_mouse_button" || button === "right_mouse_button") {
        const bbox = canvas ? await canvas.boundingBox() : null;
        if (!bbox) continue;
        const x = typeof step.mouse_x === "number" ? step.mouse_x : bbox.width / 2;
        const y = typeof step.mouse_y === "number" ? step.mouse_y : bbox.height / 2;
        await page.mouse.move(bbox.x + x, bbox.y + y);
        await page.mouse.down({ button: button === "left_mouse_button" ? "left" : "right" });
      } else if (buttonNameToKey[button]) {
        await page.keyboard.down(buttonNameToKey[button]);
      }
    }

    const frames = step.frames || 1;
    for (let i = 0; i < frames; i += 1) {
      await page.evaluate(async () => {
        if (typeof window.advanceTime === "function") {
          await window.advanceTime(1000 / 60);
        }
      });
    }

    for (const button of buttons) {
      if (button === "left_mouse_button" || button === "right_mouse_button") {
        await page.mouse.up({ button: button === "left_mouse_button" ? "left" : "right" });
      } else if (buttonNameToKey[button]) {
        await page.keyboard.up(buttonNameToKey[button]);
      }
    }
  }
}

async function main() {
  if (!fs.existsSync(SYSTEM_CHROME)) {
    throw new Error(`System Chrome not found at ${SYSTEM_CHROME}`);
  }

  const args = parseArgs(process.argv);
  ensureDir(args.screenshotDir);

  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME,
    headless: args.headless,
    args: ["--use-gl=angle", "--use-angle=swiftshader"]
  });

  const page = await browser.newPage({
    viewport: {
      width: 1440,
      height: 1600
    }
  });
  const errors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push({ type: "console.error", text: msg.text() });
    }
  });
  page.on("pageerror", (err) => {
    errors.push({ type: "pageerror", text: String(err) });
  });

  await page.addInitScript({ content: makeVirtualTimeShim() });
  await page.goto(args.url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);

  let canvas = await getCanvasHandle(page);

  if (args.clickSelector) {
    await page.click(args.clickSelector, { timeout: 5000 });
    await page.waitForTimeout(250);
  }

  if (canvas) {
    try {
      await canvas.click({ position: { x: 40, y: 40 } });
      await page.waitForTimeout(50);
    } catch {
      // Ignore focus failures and continue with keyboard actions.
    }
  }

  let steps = null;
  if (args.actionsFile) {
    const raw = fs.readFileSync(args.actionsFile, "utf-8");
    const parsed = JSON.parse(raw);
    steps = Array.isArray(parsed) ? parsed : parsed.steps;
  } else if (args.actionsJson) {
    const parsed = JSON.parse(args.actionsJson);
    steps = Array.isArray(parsed) ? parsed : parsed.steps;
  } else if (args.click) {
    steps = [
      {
        buttons: ["left_mouse_button"],
        frames: 2,
        mouse_x: args.click.x,
        mouse_y: args.click.y
      }
    ];
  }

  if (!steps) throw new Error("Actions are required. Use --actions-file, --actions-json, or --click.");

  for (let i = 0; i < args.iterations; i += 1) {
    if (!canvas) canvas = await getCanvasHandle(page);
    await doChoreography(page, canvas, steps);
    await sleep(args.pauseMs);

    await captureScreenshot(page, canvas, path.join(args.screenshotDir, `shot-${i}.png`));

    const text = await page.evaluate(() => {
      return typeof window.render_game_to_text === "function"
        ? window.render_game_to_text()
        : null;
    });
    if (text) {
      fs.writeFileSync(path.join(args.screenshotDir, `state-${i}.json`), text);
    }

    if (errors.length) {
      fs.writeFileSync(
        path.join(args.screenshotDir, `errors-${i}.json`),
        JSON.stringify(errors, null, 2)
      );
      break;
    }
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
