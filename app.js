// get the puppeteer package
const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const url = process.argv[2];

async function go() {
  // launch the browser
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });

  const page = await browser.newPage();

  await page.goto(
    "https://www.amazon.com/dp/B08PZHYWJS/ref=fs_a_mdt2_us3?th=1"
  );


  // Get product title
  const title = await page.$eval("span#productTitle", (data) => {
    return data.innerText
  });

  // Get product overall star rating
  const stars = await page.$eval("span#acrPopover span.a-declarative span.a-size-base.a-color-base", (data) => {
    return data.innerText
  });

  // Get total ratings
  const ratings = await page.$eval("span#acrCustomerReviewText", (data) => {
    return data.innerText
  });

  // Get Products' main picture URL
  const photoUrl = await page.$eval("li.image.item.itemNo0.maintain-height.selected img#landingImage", (image) => {
    return image.src
  });

  // Get Price
  const price = await page.$eval("span.a-offscreen", (data) => {
    return data.innerText
  });


  console.log("Product: " + title);
  console.log("Rating: " + stars + " out of 5 stars from a total of " + ratings);
  console.log("Product's main picture URL is: " + photoUrl);
  console.log("Product Price: " + price);
  await browser.close();
}

go();