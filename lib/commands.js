module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },

  selectPlace: async function (page, row, seat) {
    try {
      let place = `div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seat})`;
      await page.waitForSelector(place);
      await page.click(place);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${place}`);
    }
  },

  selectSeance: async function (page, day, time) {
    try {
      await page.click(`body > nav > a:nth-child(${day})`);
      await page.click(`[data-seance-start='${time}']`);
    } catch (error) {
      throw new Error(`Selector is not clickable`);
    }
  },
};