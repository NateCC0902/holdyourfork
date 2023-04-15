const puppeteer = require('puppeteer');


let username = '';
let password = '';
let course = 'Q63B01';

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
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
        await duoF.$eval('.passcode-input', el => el.value = '591128'); // YOUR DUO CODE GOES HERE
        await duoF.$eval('#passcode', el => el.click());
    }
    //select term
    await page.waitForTimeout(10000);
    await page.select('select[name="5.5.1.27.1.11.0"]', '0'); //summer
    await page.waitForSelector('input[type=submit]');
    await page.click('input[type=submit]');
    
    flag = true;
    while (flag) {
        //loop slect course
        await page.waitForTimeout(5000);
        await page.waitForSelector('input[name="5.1.27.1.23"]');
        await page.click('input[name="5.1.27.1.23"]');

        await page.waitForTimeout(5000);
        await page.type('input[name="5.1.27.7.7"]', course);
        await page.click('input[name="5.1.27.7.9"]');

        await page.waitForSelector('input[name="5.1.27.11.11"]');
        await page.click('input[name="5.1.27.11.11"]');


        const result = await page.waitForSelector('body > form > div:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(2) > span > font > b');
        let text = await result.evaluate(result => result.textContent);
        text = text.trim();
        if(text !== 'The course has not been added.'){
            flag = false;
            console.log("Course added!");
            break;
        }
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        resultText = time + " " + text + " " + course + " " + "not added" + ". " + username;
        console.log(resultText);

        await page.waitForTimeout(5000);
        await page.waitForSelector('input[name="5.1.27.27.11"]');
        await page.click('input[name="5.1.27.27.11"]');

<<<<<<< HEAD

        //wait for 5 mins 
        await page.waitForTimeout(400000);
=======
        // wait 15 minutes 
        await page.waitForTimeout(800000);
>>>>>>> 16dc054c2f907f32f1f117a6b1fb5b7bb0f6694c

    }

})();

