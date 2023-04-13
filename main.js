const puppeteer = require('puppeteer');


let username = '';
let password = '';
let course = 'Q63B01';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process'
        ]
    });
    //init
    const page = await browser.newPage();
    await page.goto('https://wrem.sis.yorku.ca/Apps/WebObjects/REM.woa/wa/DirectAction/rem');
    await page.setViewport({ width: 1080, height: 1024 });

    //login
    await page.type('#mli', username);
    await page.type('#password', password)
    const btn = '.btn.btn-lg.btn-primary';
    await page.waitForSelector(btn);
    await page.click(btn);

    //duo
    await page.waitForTimeout(10000);
    const frames = page.frames();
    const duoF = frames[1];
    if (duoF) {
        await duoF.$eval('#passcode', el => el.click());
        await duoF.$eval('.passcode-input', el => el.value = '1111111'); // YOUR DUO CODE GOES HERE
        await duoF.$eval('#passcode', el => el.click());
    }
    //select term
    await page.waitForTimeout(10000);
    await page.select('select[name="5.5.1.27.1.11.0"]', '0'); //summer
    await page.waitForSelector('input[type=submit]');
    await page.click('input[type=submit]');

    while (true) {
        //loop slect course
        await page.waitForTimeout(5000);
        await page.waitForSelector('input[name="5.1.27.1.23"]');
        await page.click('input[name="5.1.27.1.23"]');

        await page.waitForTimeout(5000);
        await page.type('input[name="5.1.27.7.7"]', course);
        await page.click('input[name="5.1.27.7.9"]');

        await page.waitForSelector('input[name="5.1.27.11.11"]');
        await page.click('input[name="5.1.27.11.11"]');

        await page.waitForTimeout(5000);
        await page.waitForSelector('input[name="5.1.27.27.11"]');
        await page.click('input[name="5.1.27.27.11"]');

        // wait 15 minutes 
        await delay(900000);

    }

})();

