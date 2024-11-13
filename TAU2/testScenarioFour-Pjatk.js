const { By, Builder, until, Key } = require("selenium-webdriver");
const assert = require("assert");
require("chromedriver");
require("safaridriver");
require("geckodriver");

const url = "https://pja.edu.pl/";
const browsers = ["chrome", "safari", "firefox"];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function test_1_pjatk(browser) {
  let driver = await new Builder().forBrowser(browser).build();
  driver.manage().window().setRect({ width: 1024, height: 1024 });

  try {
    await driver.get(url);

    let acceptCookiesButton = await driver.findElement(
      By.css("button.popup-button.cscks-btn.cscks-acceptAll"),
      10000
    );
    await driver.wait(until.elementIsVisible(acceptCookiesButton), 10000);
    assert(
      await acceptCookiesButton.isDisplayed(),
      "Accept Cookies Button is not displayed"
    );
    await acceptCookiesButton.click();

    let studiaLink = await driver.findElement(
      By.css('a.menu__link[title="Studia"]')
    );
    await driver.wait(until.elementIsVisible(studiaLink), 10000);
    assert(await studiaLink.isDisplayed(), "Studia Link is not displayed");
    if (browser !== "safari") await studiaLink.click();
    else await driver.get("https://pja.edu.pl/studia/");

    let deptName = await driver.findElement(
      By.xpath(
        `//*[@id="content"]/section/div/div/div[1]/div[2]/div[2]/div/div[2]/div[1]/h2`
      ),
      10000
    );
    assert(await deptName.isDisplayed(), "Dept Name is not displayed");

    let gdDeptButton = await driver.findElement(
      By.css('a[href="https://gdansk.pja.edu.pl/informatyka/"]'),
      10000
    );
    assert(await gdDeptButton.isDisplayed(), "GD Dept Button is not displayed");
    if (browser !== "safari") await gdDeptButton.click();
    else
      await driver.get(
        "https://gdansk.pja.edu.pl/informatyka/?_gl=1*1dgq8hs*_gcl_au*MTUzMzU3OTExMS4xNzMxNTMwODYz"
      );

    let acceptCookiesButtonGd = await driver.findElement(
      By.css("button.popup-button.cscks-btn.cscks-acceptAll"),
      10000
    );
    await driver.wait(until.elementIsVisible(acceptCookiesButtonGd), 10000);
    assert(
      await acceptCookiesButtonGd.isDisplayed(),
      "Accept Cookies Button GD is not displayed"
    );
    await acceptCookiesButtonGd.click();

    let menuButton = await driver.findElement(
      By.xpath('//button[@id="menu-toggler"]'),
      10000
    );
    await driver.wait(until.elementIsVisible(menuButton), 10000);
    assert(
      await acceptCookiesButtonGd.isDisplayed(),
      "Menu Button Button GD is not displayed"
    );
    await delay(5000);
    await menuButton.click();

    let gakkoLink = await driver.findElement(
      By.xpath('//li[@id="menu__item--182"]//a[@title="Gakko"]'),
      10000
    );
    await driver.wait(until.elementIsVisible(gakkoLink), 10000);
    assert(
      await gakkoLink.isDisplayed(),
      "Go to Gakko Button GD is not displayed"
    );
    await driver.get(gakkoLink.getAttribute("href"));

    let usernameInput = await driver.findElement(By.id("userNameInput"));
    await driver.wait(until.elementIsVisible(usernameInput), 10000);
    assert(
      (await usernameInput.getAttribute("type")) === "email",
      "email input is not of type email"
    );
    await usernameInput.clear();
    await usernameInput.sendKeys("someone@example.com");

    let passwordInput = await driver.findElement(By.id("passwordInput"));
    await driver.wait(until.elementIsVisible(passwordInput), 10000);
    assert(
      (await passwordInput.getAttribute("type")) === "password",
      "password input is not of type password"
    );
    await passwordInput.clear();
    await passwordInput.sendKeys("qwerty");

    let submitButton = await driver.findElement(By.id("submitButton"));
    await submitButton.click();

    await delay(5000);
    let errorMSg = await driver.findElement(By.id("errorText"), 10000);
    assert(await errorMSg.isDisplayed(), "errorMSg is not displayed");

    console.log("END");

    await new Promise((resolve) => setTimeout(resolve, 5000));
  } finally {
    await driver.quit();
  }
}

async function runTests() {
  for (const browser of browsers) {
    await test_1_pjatk(browser);
  }
}

runTests();
