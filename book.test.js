const { clickElement } = require("./lib/commands.js");
const { checkSelectedFilm, checkSelectingTickets, checkBuying, checkSeats } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
  await clickElement(page, "body > nav > a:nth-child(2)"); // выбор даты
  await clickElement(page, "[data-seance-start='1140']", {
    timeout: 6000,
  }); // выбор сеанса
});

afterEach(() => {
  page.close();
});

describe("qamid.tmweb.ru tests", () => {
  test("Buying one ticket", async () => {
    const row = 7;
    const seat = 8;
    const place = row + "/" + seat;

    const ticket1 = `div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seat})`;
    await clickElement(page, ticket1);
    await checkSelectedFilm(page);

    await clickElement(page, ".acceptin-button");
    await checkSelectingTickets(page);
    await checkSeats(page, place);
    await clickElement(page, "button");
    await checkBuying(page);
  });

  test("Buying three tickets", async () => {
    const row = 8;
    const seat1 = 2;
    const seat2 = 3;
    const seat3 = 4;
    const place = row + "/" + seat1 + ", " + row + "/" + seat2 + ", " + row + "/" + seat3;

    const ticket1 = `div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seat1})`;
    await clickElement(page, ticket1);
    const ticket2 = `div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seat2})`;
    await clickElement(page, ticket2);
    const ticket3 = `div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seat3})`;
    await clickElement(page, ticket3);

    await checkSelectedFilm(page);
    await clickElement(page, ".acceptin-button");
    await checkSelectingTickets(page);
    await checkSeats(page, place);
    await clickElement(page, "button");
    await checkBuying(page);
  });

  test("Choose busy seat", async () => {
    const row = 4;
    const seat = 1;
    const place = row + "/" + seat;

    const ticket1 = `div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seat})`;
    await clickElement(page, ticket1);
    await checkSelectedFilm(page);
    await clickElement(page, ".acceptin-button");
    await checkSelectingTickets(page);
    await checkSeats(page, place);
    await clickElement(page, "button");
    await checkBuying(page);

    //выбор того же места
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await clickElement(page, "body > nav > a:nth-child(2)");
    await clickElement(page, "[data-seance-start='1140']", {
      timeout: 6000,
    });
    await clickElement(page, ticket1);
    const button_state = String(
      await page.$eval("button", (button) => {return button.disabled})
      );
    expect(button_state).toContain("true");
  });
});
