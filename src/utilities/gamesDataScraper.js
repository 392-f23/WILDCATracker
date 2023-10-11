const puppeteer = require('puppeteer');

const URL = 'https://nusports.com/calendar';

async function scrapeAndPrint() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // This will wait untill all the dynamic data in the page is loaded 
    await page.goto(URL, { waitUntil: 'networkidle2' });

    // Click the "Previous month" button.
    await page.click('button.fc-prev-button');

    // Will wait until the selector appears or the provided timeout
    await page.waitForSelector('span.s-text-details-bold.text-theme-safe-light.flex.items-center > span.sr-only', 
                                { timeout: 10000 });  

    const textContent = await page.$$eval(
        'span.s-text-details-bold.text-theme-safe-light.flex.items-center > span.sr-only',
        spans => spans.map(span => span.textContent)
    );
    
    textContent.forEach(text => console.log(text));
    
    await browser.close();
}

scrapeAndPrint();