
const { database } = require('./firebase');
const puppeteer = require('puppeteer');

const URL = 'https://nusports.com/calendar';

async function scrapeAndPrint() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // This will wait untill all the dynamic data in the page is loaded 
    await page.goto(URL, { waitUntil: 'networkidle2' });

    // Will wait until the selector appears or the provided timeout
    await page.waitForSelector('button.fc-prev-button', { timeout: 10000 }); 

    // Click the "Previous month" button.
    await page.click('button.fc-prev-button');
    
    // [September-March]
    for(let i = 0; i < 1; ++i){
        // Will wait until the selector appears or the provided timeout
        await page.waitForSelector('td.fc-daygrid-day', { timeout: 10000 });  

        // Get all anchor elements
        const anchors = await page.$$('a.fc-daygrid-day-number');
        
        for (const anchor of anchors) {
            
            // Open modal window for each day 
            await anchor.click();
            
            // Check if modal appears
            try{
                await page.waitForSelector('div.s-game-card', { timeout: 3000 });  // wait up to 3 second
            } catch (error) {
                console.log("Modal did not appear within 3 second.");
            }

            const modalPresence = await page.$('div.s-game-card');

            if (modalPresence) {
                const dateValue = await anchor.evaluate(node => node.getAttribute('aria-label'));
                const date = new Date(dateValue).toISOString().split("T")[0];

                const eventKeys = await page.$$eval('div.s-game-card__header-sport-name > :nth-child(2)', 
                    spans => spans.map(span => span.textContent)
                );
                
                const imgURLs = await page.$$eval("div.s-game-card__header__team-logo img",
                    images => images.map(img => img.src)
                );

                const opponents = await page.$$eval("div.s-game-card__header__team-event-info a",
                    anchors => anchors.map(anchor => anchor.textContent)
                );

                let locations = await page.$$eval("p.text-theme-muted.s-text-paragraph-small span",
                    spans => spans.map(span => span.textContent)
                );

                // There are 2 spans couldn't figure out how to select the 2nd one
                locations = locations.filter(loc => loc != "");
                
                const arenas = await page.$$eval("p.text-theme-muted.s-text-paragraph-small", paragraphs => {
                    return paragraphs.map(p => {
                        let anchor = p.querySelector('a');
                        return anchor ? [anchor.innerText , anchor.href] : ['', ''];
                    });
                });
                
                const times = await page.$$eval("div.s-game-card__header__game-score-time span.s-text-paragraph-small", 
                    spans => spans.map(span => span.textContent)
                )

                eventKeys.forEach((e, i) => (
                    locations[i] === 'Evanston, Ill.' &&
                        console.log(`${date}-${e}-${opponents[i]}`,{
                            date: date,
                            point: Math.floor(Math.random()*5),
                            eventKey: e,
                            opponent: opponents[i],
                            imgURL: imgURLs[i],
                            times: times[i],
                            location: arenas[i][0],
                            locationURL: arenas[i][1]
                        })
                ));
                
                // Close the modal window
                await page.click('button.border-theme-border-light');

            } 
        }

        // To the next month
        await page.click('button.fc-next-button');
        
    }
   
    await browser.close();
}

scrapeAndPrint();