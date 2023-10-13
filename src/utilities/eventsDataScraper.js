const { database } = require('./firebase');
const { ref, set } = require('firebase/database');
const puppeteer = require('puppeteer');

const URL = 'https://nusports.com/calendar';

const scrape = async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    try{
        // This will wait untill all the dynamic data in the page is loaded 
        await page.goto(URL, { waitUntil: 'networkidle2' });

        // Will wait until the selector appears or the provided timeout
        await page.waitForSelector('button.fc-prev-button', { timeout: 10000 }); 

        // Click the "Previous month" button.
        await page.click('button.fc-prev-button');
        
        // [Sept-Dec]
        for (let i = 0; i < 4; ++i){
            // Will wait until the selector appears or the provided timeout
            await page.waitForSelector('td.fc-daygrid-day', { timeout: 10000 });  

            // Get all anchor elements
            const anchors = await page.$$('a.fc-daygrid-day-number');
            
            for (const anchor of anchors) {
                
                // Open modal window for each day 
                await anchor.click();
                
                const date = await anchor.evaluate(node => node.getAttribute('aria-label'));

                console.log(`Trying to fetch data for ${date}..`);

                // Check if modal appears
                try{
                    await page.waitForSelector('div.s-game-card', { timeout: 15000 });  // wait up to 5 second
                } catch (error) {
                    console.log('\x1b[93m%s\x1b[0m', `Modal window did not appear within 15 seconds!`);
                }

                const modalPresence = await page.$('div.s-game-card');

                if (modalPresence) {
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
                    
                    const stadiums = await page.$$eval("p.text-theme-muted.s-text-paragraph-small", paragraphs => {
                        return paragraphs.map(p => {
                            let anchor = p.querySelector('a');
                            return anchor ? [anchor.innerText , anchor.href] : ['', ''];
                        });
                    });
                    
                    const times = await page.$$eval("div.s-game-card__header__game-score-time span.s-text-paragraph-small", 
                        spans => spans.map(span => span.textContent)
                    )

                    for (let j = 0; j < eventKeys.length; ++j) {
                        if (locations[j] === 'Evanston, Ill.') {
                            const computedKey = 
                                `${new Date(date).toISOString().split("T")[0]}-${eventKeys[j]}-${opponents[j]?.replace(/[0-9]/g, '')}`
                                .replace(/\s+/g,'').replace(/\./g,'').replace(/\$/g,'').replace(/\[/g,'')
                                .replace(/\]/g,'').replace(/\#/g,'').replace(/\//g, '');

                            const value = {
                                date: typeof date === 'undefined' ? null : new Date(date).getTime(),
                                point: Math.floor(Math.random()*6),
                                eventKey: typeof eventKeys[j] === 'undefined' ? null : eventKeys[j],
                                opponent: typeof opponents[j] === 'undefined' ? null : opponents[j],
                                imgURL: typeof imgURLs[j] === 'undefined' ? null : imgURLs[j] ,
                                time: typeof times[j] === 'undefined' ? null : times[j],
                                location: typeof stadiums[j][0] === 'undefined' ? null : stadiums[j][0],
                                locationURL: typeof stadiums[j][1] === 'undefined' ? null : stadiums[j][1]
                            };
                            
                            //console.log({ [computedKey]: value });
                            await set(ref(database, `events/${computedKey}`), value);
                        }
                    }
                    
                    console.log('\x1b[32m%s\x1b[0m', "Data successfully added!");

                    // Close the modal window
                    await page.click('button.border-theme-border-light');

                } 
            }

            // To the next month
            await page.click('button.fc-next-button');
            
        }

    } catch (error){
        console.error("Error during scraping ", error);
    }
   
    await browser.close();

    // waited for 3 minutes process does not exit automatically 
    // needs debugging
    process.exit(0);

}

scrape();