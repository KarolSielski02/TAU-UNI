const { By, Builder, until, Key } = require("selenium-webdriver");
const assert = require("assert");
require("chromedriver");
require("safaridriver");
require("geckodriver");

const url = "https://pl.wikipedia.org/";
const browsers = ["chrome", "safari", "firefox"];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function test_1_wikipedia(browser) {
  let driver = await new Builder().forBrowser(browser).build();
  driver.manage().window().setRect({ width: 1024, height: 1024 });

  try {
    await driver.get(url);

    let searchButton = await driver.wait(
      until.elementLocated(By.css('a[accesskey="f"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(searchButton), 10000);
    assert(await searchButton.isDisplayed(), "Search button is not displayed");
    await searchButton.click();

    let searchInput = await driver.wait(
      until.elementLocated(By.css('input[name="search"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(searchInput), 10000);
    const searchInputVisible = await searchInput.isDisplayed();
    assert(searchInputVisible, "Search button is not displayed");
    assert(
      (await searchInput.getAttribute("type")) === "search",
      "Search button is not search type"
    );

    await searchInput.clear();
    await searchInput.sendKeys("Polska");
    if (browser !== "safari") {
      await searchInput.sendKeys(Key.ENTER);
    } else {
      let polandElement = await driver.wait(
        until.elementLocated(By.css("a[href*='search=Polska']")),
        10000
      );
      assert(
        await polandElement.isDisplayed(),
        "Poland Element is not displayed"
      );
      await polandElement.click();
    }

    await delay(2500);
    let pageTitle = await driver.wait(
      until.elementLocated(By.css("span.mw-page-title-main")),
      10000
    );
    await driver.wait(until.elementIsVisible(pageTitle), 10000);
    let ppt = await pageTitle.getText();
    assert(ppt === "Polska", "Title is not Polska");

    let warsawLink = await driver.findElement(By.linkText("Warszawa"), 10000);
    assert(await warsawLink.isDisplayed(), "Warsaw Link is not displayed");
    await warsawLink.click();

    let warsawTitle = await driver.findElement(
      By.xpath("//span[text()='Warszawa']"),
      10000
    );
    let wpt = await warsawTitle.getText();
    assert(wpt === "Warszawa", "Title is not Warszawa");

    let langCheckbox = await driver.findElement(By.id("p-lang-btn"), 10000);
    assert(await langCheckbox.isDisplayed(), "Lang Checkbox is not displayed");
    await langCheckbox.click();
    await delay(2500);

    if (browser !== "safari") {
      let englishLang = await driver.findElement(
        By.xpath('//a[@hreflang="en" and @class="autonym"]'),
        10000
      );
      assert(await englishLang.isDisplayed(), "English Lang is not displayed");
      await englishLang.click();
    } else {
      driver.get("https://en.wikipedia.org/wiki/Warsaw"); //Safari is broken I swear to god
    }

    let warsawTitleEng = await driver.findElement(
      By.css(".mw-page-title-main"),
      10000
    );
    let wptEn = await warsawTitleEng.getText();
    assert(wptEn === "Warsaw", "Title is not Warsaw");

    console.log("END");

    await new Promise((resolve) => setTimeout(resolve, 5000));
  } finally {
    await driver.quit();
  }
}

async function runTests() {
  for (const browser of browsers) {
    await test_1_wikipedia(browser);
  }
}

runTests();
