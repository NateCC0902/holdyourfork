# ----------------Prerequisite------------------



1. node 

LINK: https://nodejs.org/en

2. A text editor 

Recommend: https://code.visualstudio.com/



# ----------------How to use it------------------



### Step 1. open your terminal and


```
git clone https://github.com/NateCC0902/holdyourfork
cd holdyourfork
npm install
```



### Step 2. Open main.js config your username, password, DUO CODE and course code. 


(you may edit by "code main.js" in terminal, if you have vsc)


Inside there are:

```
let username = ''; 
let password = ''; 
let course = 'AAAAA'; // course code you wanna add

// line 34 you need to modif your DUO code there

await duoF.$eval('.passcode-input', el => el.value = ' YOUR DUO CODE '); // YOUR DUO CODE GOES HERE ''

```



### Step 3. Run it (in terminal).


```
node main.js
```



# ----------------Reminder------------------




This script re add course every 30 mins. DONT make it shorter you may block by school.

DUO passcode is one time use. 

headless: false // this is for show you how the script run it. and set it true will run the script background.
