const { By, Builder, until } = require("selenium-webdriver");
const assert = require("assert");
require("chromedriver");
require("safaridriver");
require("geckodriver");

const url = "https://otodom.pl/";
const browsers = ["chrome", "safari", "firefox"];

async function test_1_otodom(browser) {
  let driver = await new Builder().forBrowser(browser).build();
  driver.manage().window().setRect({ width: 1024, height: 800 });

  try {
    await driver.get(url);

    const acceptButton = await driver.wait(
      until.elementLocated(By.id("onetrust-accept-btn-handler")),
      10000
    );
    assert(
      await acceptButton.isDisplayed(),
      "Accept Cookies button is not displayed"
    );
    await acceptButton.click();

    const burgerMenu = await driver.wait(
      until.elementLocated(By.className("e12g1ibn8 css-1dba7bu")),
      10000
    );
    assert(await burgerMenu.isDisplayed(), "Burger Menu is not displayed");
    await burgerMenu.click();

    const buyButton = await driver.wait(
      until.elementLocated(By.id("sell")), //yeah buy button has "sell" id
      10000
    );
    assert(await buyButton.isDisplayed(), "buyButton is not displayed");
    await buyButton.click();

    const buyEstateButton = await driver.wait(
      until.elementLocated(By.id("sellEstate")),
      10000
    );
    assert(
      await buyEstateButton.isDisplayed(),
      "buyEstateButton is not displayed"
    );
    await buyEstateButton.click();

    const buyEstatApartmentsButton = await driver.wait(
      until.elementLocated(By.id("sellEstateApartments")),
      10000
    );
    assert(
      await buyEstatApartmentsButton.isDisplayed(),
      "buyEstatApartmentsButton is not displayed"
    );
    await buyEstatApartmentsButton.click();

    const typeOfEstate = await driver.wait(
      until.elementLocated(By.className("css-1gfi8mm")),
      10000
    );
    assert(await typeOfEstate.isDisplayed(), "typeOfEstate is not displayed");
    assert.equal(
      await typeOfEstate.getAttribute("innerHTML"),
      "Mieszkania na sprzedaż",
      "typeOfEstate is not Mieszkania na sprzedaż"
    );

    const range = await driver.wait(
      until.elementLocated(By.className("ezcytw15")),
      10000
    );
    assert(await range.isDisplayed(), "typeOfEstate is not displayed");
    assert(
      (await range.getAttribute("innerHTML")).includes("Cała Polska"),
      "range is not Cała Polska"
    );

    await new Promise((resolve) => setTimeout(resolve, 5000));
  } finally {
    await driver.quit();
  }
}

async function runTests() {
  for (const browser of browsers) {
    await test_1_otodom(browser);
  }
}

runTests();
