const { getText } = require("./commands.js");

module.exports = {
  checkSelectedFilm: async function (page) {
    const actual = await getText(page, ".buying__info-title");
    expect(actual).toContain("Логан");
    const actual1 = await getText(page, ".buying__info-hall");
    expect(actual1).toContain("Зал 1");
    const actual2 = await getText(page, ".buying__info-start");
    expect(actual2).toContain("19:00");
  },

  checkSelectingTickets: async function (page) {
    const actual = await getText(page, "h2");
    expect(actual).toContain("Вы выбрали билеты:");
  },

  checkSeats: async function (page, place) {
  const actualSeats = await getText(page, "body > main > section > div > p:nth-child(2) > span");
  expect(actualSeats).toContain(place);
  },

  checkBuying: async function (page) {
    const actual = await getText(page, "h2");
    expect(actual).toContain("Электронный билет");
  },
};
