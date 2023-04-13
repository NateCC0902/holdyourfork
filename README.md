you need puppeteer to run the script. 

open your terminal and

git clone https://github.com/NateCC0902/holdyourfork
cd holdyourfork
pip install puppeteer

and config you password.js 

let username = ''; 
let password = ''; 
let course = 'AAAAA'; // course code you wanna add

and in main.js you also need set DUO passcode (dont use push).

To run it.
node main.js

----------------remind------------------

This script re add course every 15 mins. DONT make it shorter you may block by school.

DUO passcode is one time use. 

headless: false // this is for show you how the script run it. and set it true will run the script background.
