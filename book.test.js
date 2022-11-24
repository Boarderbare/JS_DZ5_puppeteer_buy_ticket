const { clickElement, selectPlace, selectSeance } = require("./lib/commands.js");
const { checkSelectedFilm, checkSelectingTickets, checkBuying, checkSeats} = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php",
  {setTimeout: 20000},
  );
});

afterEach(() => {
  page.close();
});

describe("qamid.tmweb.ru tests", () => {
  test("Buying one ticket", async () => {
    const row = 8;
    const seat = 8;
    const place = row + "/" + seat;
    const day = 2; 
    const time = "1140";

    await selectSeance(page, day,time);
    await selectPlace(page, row, seat);
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
    const day = 2; 
    const time = "1140";

    await selectSeance(page, day,time);
    await selectPlace(page, row, seat1);
    await selectPlace(page, row, seat2);
    await selectPlace(page, row, seat3);
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
    const day = 2; 
    const time = "1140";

    await selectSeance(page, day,time);

    await selectPlace(page, row, seat);
    await checkSelectedFilm(page);
    await clickElement(page, ".acceptin-button");
    await checkSelectingTickets(page);
    await checkSeats(page, place);
    await clickElement(page, "button");
    await checkBuying(page);

    //выбор того же места
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await selectSeance(page, day,time);
    await selectPlace(page, row, seat);

    const button_state = await page.$eval("button", (button) => {return button.disabled});
    expect(button_state).toBe(true);
  });
});
