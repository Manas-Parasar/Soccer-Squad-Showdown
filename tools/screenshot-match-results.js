const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const fileUrl =
    "file://" + path.resolve(__dirname, "..", "frontend", "index.html");
  await page.goto(fileUrl, { waitUntil: "networkidle0" });

  // Ensure the script has loaded
  await page.waitForFunction('typeof simulateMatch === "function"');

  // Prepare a valid lineup in the page context and call simulateMatch
  await page.evaluate(() => {
    // Use first 11 players from predefinedPlayers across categories
    const all = [];
    for (const cat of Object.keys(predefinedPlayers)) {
      predefinedPlayers[cat].forEach((p) => all.push(p));
    }
    const chosen = all.slice(0, 11).map((p, i) => ({ ...p }));

    // set global variables expected by simulateMatch
    window.currentFormation = "4-3-3";
    window.selectedPlayers = chosen;

    // Fill lineup according to formationLineups if available
    const formationOrder =
      typeof formationLineups !== "undefined" && formationLineups["4-3-3"]
        ? formationLineups["4-3-3"]
        : [
            "GK",
            "LB",
            "LCB",
            "RCB",
            "RB",
            "LCM",
            "RCM",
            "CAM",
            "LW",
            "ST",
            "RW",
          ];
    window.lineup = formationOrder.map((pos, idx) => ({
      slotId: idx,
      positionType: pos,
      player: chosen[idx],
    }));

    // Ensure tournament object exists
    if (typeof tournament === "undefined")
      window.tournament = {
        round: 0,
        opponents: [],
        results: [],
        userWins: 0,
        aiWins: 0,
        draws: 0,
        maxRounds: 1,
      };

    // Force opponent selection mode so simulateMatch can pick AI team
    window.tournament.opponentSelectionMode = "aiGenerated";
  });

  // Run the match simulation inside the page
  await page.evaluate(() => {
    return simulateMatch();
  });

  // Wait for post-match section to appear
  await page.waitForSelector("#post-match-section:not(.hidden)", {
    timeout: 20000,
  });

  // Click each tab and take a screenshot
  const screenshotsDir = path.resolve(
    __dirname,
    "..",
    "frontend",
    "screenshots"
  );
  if (!fs.existsSync(screenshotsDir))
    fs.mkdirSync(screenshotsDir, { recursive: true });

  // Summary tab (active by default)
  await page.waitForSelector("#summary-tab");
  await page.click("#summary-tab");
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(screenshotsDir, "summary.png"),
    fullPage: true,
  });

  // Team Stats
  await page.click("#team-stats-tab");
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(screenshotsDir, "team-stats.png"),
    fullPage: true,
  });

  // Player Ratings
  await page.click("#player-ratings-tab");
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(screenshotsDir, "player-ratings.png"),
    fullPage: true,
  });

  await browser.close();
  console.log("Screenshots saved to", screenshotsDir);
})();
