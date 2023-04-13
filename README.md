----------------Prerequisite------------------

1. node 
LINK: https://nodejs.org/en

----------------How to use it------------------

you need puppeteer to run the script. 

Step 1. open your terminal and


```
git clone https://github.com/NateCC0902/holdyourfork
cd holdyourfork
npm install
```

Step 2. Create your password.js

Inside you need:

```
let username = ''; 
let password = ''; 
let course = 'AAAAA'; // course code you wanna add
```
and in main.js you also need set DUO passcode (dont use push).

Step 3. Run it (in terminal).
```
node main.js
```

----------------Reminder------------------

This script re add course every 15 mins. DONT make it shorter you may block by school.

DUO passcode is one time use. 

headless: false // this is for show you how the script run it. and set it true will run the script background.
