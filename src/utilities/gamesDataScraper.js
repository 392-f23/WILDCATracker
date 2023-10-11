const puppeteer = require('puppeteer');

const URL = 'https://nusports.com/calendar';

async function scrapeAndPrint() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // networkidle2 ensures all dynamic data is loaded 
    await page.goto(URL, { waitUntil: 'networkidle2' });  

    const textContent = await page.$$eval(
        'span.s-text-details-bold.text-theme-safe-light.flex.items-center > span.sr-only',
        spans => spans.map(span => span.textContent)
    );
    
    textContent.forEach(text => console.log(text));

    await browser.close();
}

scrapeAndPrint();