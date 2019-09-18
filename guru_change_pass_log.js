// Test scenario: change Password and Login

const {Builder, By, Key, until} = require ("selenium-webdriver");
const firefox = require ("selenium-webdriver/firefox");
const webdriver = require ("selenium-webdriver");
var assert = require("assert");

var parameters = {  id: "mngr215939", // has expiration date. I wrote code to get updated access to demo page.
                    password: "2!", 
                    oldIncorrectPassword: "133", 
                    newPassword: "2!", //could be an issue, while old and new passwords are same. With every test, new password has to b e generated with Math.random() method and old password has to be owerwrited.
                    descript_SM1: "\nSM1: Enter incorrect Old Password", 
                    descript_SM2: "\nSM2: Verify after Password is changed, page is redirected to login screen",
                    descript_SM3: "\nSM3: Verify if User can login with NEW password after the password is changed",
                    expectedResult1_SM1: "\nExpected result #1: a pop-up 'Old Password is incorrect' is shown", 
                    expectedResult2_SM1: "\nExpected result #2: User redirected to Change Password Page ",
                    expectedResult1_SM2: "\nExpected result #1: a Pop-up 'Password is Changed' is shown",
                    expectedResult2_SM2: "\nExpected result #2: User logged out and redirected to login page",
                    expectedResult_SM3:  "\nExpected result: User redirected to manager Home Page"

                };

//SM1 Enter incorrect Old Password

async function enterOldIncorrectPassword (id, pass, oldPass, newPass, descript, result1, result2) {
    let driver = new Builder()
    .forBrowser('firefox')
    .build();
    await driver.get("http://www.demo.guru99.com/V4/");
    await driver.findElement(By.xpath("/html/body/form/table/tbody/tr[1]/td[2]/input")).sendKeys(id);
    await driver.findElement(By.xpath("/html/body/form/table/tbody/tr[2]/td[2]/input")).sendKeys(pass);
    await driver.findElement(By.xpath("/html/body/form/table/tbody/tr[3]/td[2]/input[1]")).click();
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/ul/li[11]/a"))).click();
    await driver.findElement(By.xpath("/html/body/table/tbody/tr/td/table/tbody/tr[4]/td[2]/input")).sendKeys(oldPass);
    await driver.findElement(By.xpath("/html/body/table/tbody/tr/td/table/tbody/tr[5]/td[2]/input")).sendKeys(newPass);
    await driver.findElement(By.xpath("/html/body/table/tbody/tr/td/table/tbody/tr[6]/td[2]/input")).sendKeys(newPass); 
    await driver.findElement(By.xpath("/html/body/table/tbody/tr/td/table/tbody/tr[7]/td[2]/input[1]")).click();
    await driver.wait(until.alertIsPresent());
    await driver.switchTo().alert().getText()
    .then(
        (text) => {
            if (text == "Old Password is incorrect") {
                console.log(descript + "\nPASS: " + text + result1);
            } else {
                console.log (descript + "\nFAIL: " + text + result1);
            }     
        }    
    );
    await driver.switchTo().alert().accept();
    await driver.wait(until.elementLocated(By.xpath("/html/body/table/tbody/tr/td/table/tbody/tr[1]/td/p"))).getText()
    .then(
        (text) => {
            if (text == "Change Password") {
                console.log("\nPASS: " + text + result2);
            } else {
                console.log("\nFAIL: " + text + result2);
            }
        }
    );
    await driver.quit();
}


//SM2 Verify after Password is changed, page is redirected to login screen

async function changePassword(descript, id, pass, newPass, result1, result2) {
    let driver = new Builder()
    .forBrowser('firefox')
    .build();
    await driver.get("http://www.demo.guru99.com/V4/");
    await driver.findElement(By.xpath("/html/body/form/table/tbody/tr[1]/td[2]/input")).sendKeys(id);
    await driver.findElement(By.xpath("/html/body/form/table/tbody/tr[2]/td[2]/input")).sendKeys(pass);
    await driver.findElement(By.xpath("/html/body/form/table/tbody/tr[3]/td[2]/input[1]")).click();
    await driver.findElement(By.xpath("/html/body/div[3]/div/ul/li[11]/a")).click();
    await driver.findElement(By.xpath("/html/body/table/tbody/tr/td/table/tbody/tr[4]/td[2]/input")).sendKeys(pass);
    await driver.findElement(By.xpath("/html/body/table/tbody/tr/td/table/tbody/tr[5]/td[2]/input")).sendKeys(newPass);
    await driver.findElement(By.xpath("/html/body/table/tbody/tr/td/table/tbody/tr[6]/td[2]/input")).sendKeys(newPass); 
    await driver.findElement(By.xpath("/html/body/table/tbody/tr/td/table/tbody/tr[7]/td[2]/input[1]")).click();
    await driver.wait(until.alertIsPresent());
    await driver.switchTo().alert().getText()
    .then(
        (text) => {
            if (text == "Password is Changed") {
                console.log(descript + "\nPASS: " + text + result1);
            } else {
                console.log (descript + "\nFAIL: " + text + result1);
            }     
        }    
    );
    await driver.switchTo().alert().accept();
    var idField = await driver.wait(until.elementLocated(By.xpath("/html/body/form/table/tbody/tr[1]/td[2]/input"))).isDisplayed()
    .then(function(value)
        {   console.log("ID field is presented");
           return value;
        },
        function(reason) {
            console.log("ID field is not presented");
            return reason;
        }
    );
    var passField = await driver.wait(until.elementLocated(By.xpath("/html/body/form/table/tbody/tr[2]/td[2]/input"))).isDisplayed()
    .then(
        function(value) {
            console.log("Password field is presented");
            return value;
        },
        function(reason) {
           console.log("Password field is not presented");
            return reason;
        }
    );

    if (idField && passField) {
        console.log("\PASS: " + result2);
    } else {
        console.log("\nFAIL: Login section is not presented" + result2)
    }
    await driver.quit();
}

//SM3 Verify if User can login with NEW password after the password is changed

async function loginWithNewPass(id, newPass, result, descript) {
    let driver = new Builder()
    .forBrowser('firefox')
    .build();
    await driver.get("http://www.demo.guru99.com/V4/");
    await driver.findElement(By.xpath("/html/body/form/table/tbody/tr[1]/td[2]/input")).sendKeys(id);
    await driver.findElement(By.xpath("/html/body/form/table/tbody/tr[2]/td[2]/input")).sendKeys(newPass);
    await driver.findElement(By.xpath("/html/body/form/table/tbody/tr[3]/td[2]/input[1]")).click();
    var title = await driver.getTitle()
    .then(
        (title) => {
            return title;
        }
    );
    if (title == "Guru99 Bank Manager HomePage") {
        console.log(descript + "\nPASS:" + title + result);
    } else {
        console.log(descript + "\FAIL: " + title + result);
    }
    await driver.quit(); 
}




enterOldIncorrectPassword(parameters.id, parameters.password, parameters.oldIncorrectPassword, parameters.newPassword, parameters.descript_SM1, parameters.expectedResult1_SM1, parameters.expectedResult2_SM1);
changePassword(parameters.descript_SM2, parameters.id, parameters.password, parameters.newPassword, parameters.expectedResult1_SM2, parameters.expectedResult2_SM2);
loginWithNewPass(parameters.id, parameters.newPassword, parameters.expectedResult_SM3, parameters.descript_SM3);