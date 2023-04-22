const puppeteer = require('puppeteer');

let username = '';
let password = '';
let duocode = '';
let course = [];

process.argv.forEach(function(val, index, array) {
    if (index == 2) {
        username = val;
    }
    if (index == 3) {
        password = val;
    }
    if (index == 4) {
        duocode = val;
    }
    if (index == 5) {
        course.push(val);
    }

});
console.log('INFO - username: ' + username);
console.log('INFO - password: ' + password);
console.log('INFO - duo_code: ' + duocode);
console.log('INFO - courses['+ course.length +']: '  + course);

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--no-sandbox',
            '--disable-dev-shm-usage',
        ]
    });
    //init
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0); 
    await page.goto('https://wrem.sis.yorku.ca/Apps/WebObjects/REM.woa/wa/DirectAction/rem');
    await page.setViewport({ width: 1080, height: 1024 });

    await login(page);

    flag = true;
    while (flag) {
        //loop slect course

        if (course.length == 0) {
            console.log("INFO - No more courses to add");
            break;
        } else {
            //random choose index
            var index = Math.floor(Math.random() * course.length);
        }

        await page.waitForTimeout(15000);
        await page.waitForSelector('input[name="5.1.27.1.23"]');
        await page.click('input[name="5.1.27.1.23"]');

        await page.waitForTimeout(15000);
        await page.type('input[name="5.1.27.7.7"]', course[index]);
        await page.click('input[name="5.1.27.7.9"]');

        await page.waitForSelector('input[name="5.1.27.11.11"]');
        await page.click('input[name="5.1.27.11.11"]');


        const result = await page.waitForSelector('body > form > div:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(2) > span > font > b');
        let text = await result.evaluate(result => result.textContent);
        text = text.trim();
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();

        if (text === 'The course has been successfully added.') {
            flag = false;
            console.log(text);
            console.log("INFO - Course added: " + course.pop() + " " + username + " " + time);
        } else {
            resultText = text + " INFO: " + course[index] + " add fail " + username + " " + time + " left courses: " + course.length;
            console.log(resultText);
        }

        await page.waitForTimeout(15000);
        await page.waitForSelector('input[name="5.1.27.27.11"]');
        await page.click('input[name="5.1.27.27.11"]');



        // wait for 5 mins * 12 = 1 hour
        for (let i = 0; i < 12; i++) {
            await page.waitForTimeout(200000);
            await page.reload();    
        }

    }

})();

async function login(page) {
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
        await duoF.$eval('.passcode-input', (el, duocode) => { el.value = duocode }, duocode); // YOUR DUO CODE GOES HERE
        await duoF.$eval('#passcode', el => el.click());
    }

    console.log("Login Successed");
    //select term
    await selectTerm(page);


}

async function selectTerm(page) {
    await page.waitForTimeout(10000);
    await page.select('select[name="5.5.1.27.1.11.0"]', '0'); //summer
    await page.waitForSelector('input[type=submit]');
    await page.click('input[type=submit]');
}
