const { By, Builder, until } = require("selenium-webdriver");
const assert = require("assert");
require("chromedriver");
require("safaridriver");
require("geckodriver");

const url = "https://stackoverflow.com/";
const browsers = ["chrome", "firefox", "safari"];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function test_1_overflow(browser) {
  let driver = await new Builder().forBrowser(browser).build();
  driver.manage().window().setRect({ width: 1024, height: 1024 });

  try {
    await driver.get(url);

    const acceptCookiesButton = await driver.wait(
      until.elementLocated(By.id("onetrust-accept-btn-handler")),
      10000
    );
    assert(
      await acceptCookiesButton.isDisplayed(),
      "Accept Cookies button is not displayed"
    );
    await acceptCookiesButton.click();
    await delay(5000);

    if (browser === "safari" || browser === "firefox") {
      const iframe = await driver.findElement(
        By.css('iframe[title="Okno Zaloguj się przez Google"]')
      );
      await driver.switchTo().frame(iframe);

      const closeGoogle = await driver.wait(
        until.elementLocated(By.id("close")),
        10000
      );
      assert(
        await closeGoogle.isDisplayed(),
        "Continue google Button is not displayed"
      );
      await closeGoogle.click();
      await driver.switchTo().defaultContent();
    }

    const singUpButton = await driver.wait(
      until.elementLocated(By.linkText("Sign up")),
      10000
    );
    assert(
      await singUpButton.isDisplayed(),
      "Sing up Button button is not displayed"
    );
    await delay(5000);
    await singUpButton.click();

    const loginLink = await driver.wait(
      until.elementLocated(By.linkText("Log in")),
      10000
    );
    assert(await loginLink.isDisplayed(), "Log in link is not displayed");
    await delay(5000);
    if (browser !== "safari") {
      await loginLink.click();
    } else {
      driver.get(
        "https://stackoverflow.com/users/login?ssrc=head&returnurl=https%3a%2f%2fstackoverflow.com%2f"
      );
    }

    const loginForm = await driver.wait(
      until.elementLocated(By.id("login-form")),
      10000
    );
    assert(await loginForm.isDisplayed(), "Log Form is not displayed");

    const emailInput = await driver.wait(
      until.elementLocated(By.id("email")),
      10000
    );
    assert(await emailInput.isDisplayed(), "Email input is not displayed");
    assert(
      (await emailInput.getAttribute("type")) === "email",
      "Email input is not of type email"
    );

    const pwInput = await driver.wait(
      until.elementLocated(By.id("password")),
      10000
    );
    assert(await pwInput.isDisplayed(), "Password input is not displayed");
    assert(
      (await pwInput.getAttribute("type")) === "password",
      "Password input is not of type email"
    );

    const submitButton = await driver.wait(
      until.elementLocated(By.id("submit-button")),
      10000
    );
    assert(await submitButton.isDisplayed(), "Submit input is not displayed");

    emailInput.clear();
    await emailInput.sendKeys("test@test.com");
    pwInput.clear();
    await pwInput.sendKeys("qwerty");
    await submitButton.click();

    await delay(5000);
    const warningAboutNonExistantAccount = await driver.wait(
      until.elementLocated(By.css("p.s-input-message.js-error-message")),
      10000
    );
    assert(
      await warningAboutNonExistantAccount.isDisplayed(),
      "Warning about wrong credentials is not displayed"
    );

    console.log("END");

    await new Promise((resolve) => setTimeout(resolve, 5000));
  } finally {
    await driver.quit();
  }
}

async function runTests() {
  for (const browser of browsers) {
    await test_1_overflow(browser);
  }
}

runTests();
