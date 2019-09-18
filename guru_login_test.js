const {Builder, By, Key, until} = require ("selenium-webdriver");
const firefox = require ("selenium-webdriver/firefox");
const webdriver = require ("selenium-webdriver");
var assert = require("assert");
var fs = require ("fs");

//Login parameters for test cases:
var parameters = 
[
    {userID: "mngr215939", pass: "2!", result: "\nExpected result: should be logged: ", descript: "\nSS1: Loging in with valid ID and valid Password"}, 
    {userID: "inv", pass: "qusEten", result: "\nExpected result: should be unlogged: ", descript: "\nSS2: Loging in with invalid ID and valid Password"}, 
    {userID: "mngr215939", pass: "inv", result: "\nExpected result: should be unlogged: ", descript: "\nSS3: Loging in with valid ID and invalid Password"},
    {userID: "inv", pass: "inv", result: "\nExpected result: should be unlogged: ", descript: "\nSS4: Loging in with invalid ID and invalid Password"}
];

//call functions with diefferent parameters for different test cases:

login_and_welcome(parameters[0].userID, parameters[0].pass, parameters[0].result, parameters[0].descript);
login_and_alarm(parameters[1].userID, parameters[1].pass, parameters[1].result, parameters[1].descript);
login_and_alarm(parameters[2].userID, parameters[2].pass, parameters[2].result, parameters[2].descript);
login_and_alarm(parameters[3].userID, parameters[3].pass, parameters[3].result, parameters[3].descript);

function login_and_welcome(id, pass, result, descript) {
    let driver = new Builder()
    .forBrowser('firefox')
    .build();
    driver.get("http://www.demo.guru99.com/V4/")
    .then(
        function() {
            driver.findElement(By.xpath("/html/body/form/table/tbody/tr[1]/td[2]/input")).sendKeys(id)
            .then(
                function(){
                    driver.findElement(By.xpath("/html/body/form/table/tbody/tr[2]/td[2]/input")).sendKeys(pass)
                }
            )
            .then(
                function() {
                    driver.findElement(By.xpath("/html/body/form/table/tbody/tr[3]/td[2]/input[1]")).click();
                }
            );
        }
    )
    .then(
        function() {
            driver.wait(until.elementLocated(By.xpath("/html/body/table/tbody/tr/td/table/tbody/tr[3]/td"))).getText()
            .then(
                function(text){
                    if (text) {
                        console.log(descript + "\nPASS: " + result + text);
                        return text;
                    } else {
                        console.log(descript + "\nFAIL: ERROR! " + result);
                    }
                    
                }
            )
            .then(   //taking screenshot. picture is located in same folder with guru_tests.js file.
                function() {
                    driver.takeScreenshot().then(function(data){
                         fs.writeFileSync("img.png", data, "base64");
                         console.log("Screenshot is taken. Check folder 'test' ")
                        }
                    )
                    .then(
                        function() {
                            driver.quit();
                        }
                    );        
                }
            );
            
        }
    ); 
}
 
async function login_and_alarm(id, pass, result, descript) {
    let driver = new Builder()
    .forBrowser('firefox')
    .build();
    driver.get("http://www.demo.guru99.com/V4/");
    await driver.findElement(By.xpath("/html/body/form/table/tbody/tr[1]/td[2]/input")).sendKeys(id);
    await driver.findElement(By.xpath("/html/body/form/table/tbody/tr[2]/td[2]/input")).sendKeys(pass);
    await driver.findElement(By.xpath("/html/body/form/table/tbody/tr[3]/td[2]/input[1]")).click();
    await driver.wait(until.alertIsPresent());
    await driver.switchTo().alert().getText()
    .then(
        (al) => {
            if (al == "User or Password is not valid") {
                console.log(descript + "\nPASS: " + result + al);
            } else {
                console.log(descript + "\nFAIL: " + result + al);
            }
        }
    );
    await driver.switchTo().alert().accept();
    await driver.quit();
}



/*

async function login_and_alarm(id, pass, result, descript) {
    let driver = new Builder()
        .forBrowser('firefox')
        .build();
        driver.get("http://www.demo.guru99.com/V4/")
            .then(
                function(){
                    driver.findElement(By.xpath("/html/body/form/table/tbody/tr[1]/td[2]/input")).sendKeys(id)
                    .then(
                        function(){
                            driver.findElement(By.xpath("/html/body/form/table/tbody/tr[2]/td[2]/input")).sendKeys(pass)
                        }
                    )
                    .then(
                        function(){
                            driver.findElement(By.xpath("/html/body/form/table/tbody/tr[3]/td[2]/input[1]")).click();
                        }
                    );
                    }
            )
            .then(
                function(){
                    driver.wait(until.alertIsPresent())
                        .then(
                            function() {
                                driver.switchTo().alert().getText()
                                .then(
                                    function(al) {
                                        console.log(descript + "\nPASS:" + result + al);
                                    }
                                )
                            }
                        )
                        .then(
                            function(){
                                driver.switchTo().alert().accept()
                                .then(
                                    function() {
                                        driver.quit();
                                    }
                                );   
                            }
                        );
                    }        
         
            );    
}

*/