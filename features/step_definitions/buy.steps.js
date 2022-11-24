const {
    Given,
    When,
    Then,
    Before,
    After
} = require('cucumber');
const puppeteer = require("puppeteer");
const chai = require("chai");
const {
    clickElement,
    selectPlace,
    selectSeance,
    getText
} = require("../../lib/commands.js");
const {
    checkSelectingTickets,
    checkBuying,
    checkSeats
} = require("../../lib/util.js");


Before(async function () {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        args: ['--start-maximized'] 
    });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
});

After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});


Given("user goes to page {string}", async function (string) {
    return await this.page.goto(string, {
        setTimeout: 20000,
    });
});

When("user select date tomorrow {string} and time seance {string}", async function (day, time) {
    return await selectSeance(this.page, day, time);
});

When("user select place row {string} and seat {string}", async function (row, seat) {
    return await selectPlace(this.page, row, seat);
});

When("user click on button Забронирвоать", async function () {
    return await clickElement(this.page, ".acceptin-button");
});

Then('user get ticket info {string} tickets with place {string}', async function (massage, place) {
    const actual = await getText(this.page, "h2");
    chai.expect(actual).contains(massage);
    const actualSeats = await getText(this.page, "body > main > section > div > p:nth-child(2) > span");
    chai.expect(actualSeats).contains(place);

});

When('user click on the button Получить код бронирования', async function () {
    return await clickElement(this.page, "button");
});

Then('user get massage {string}', async function (massage) {
    const actual = await getText(this.page, "h2");
    chai.expect(actual).contains(massage);
});


When('button Забронирвоать not active', async function () {
    const button_state = await this.page.$eval("button", (button) => {return button.disabled});
    chai.expect(button_state).equal(true);
});
