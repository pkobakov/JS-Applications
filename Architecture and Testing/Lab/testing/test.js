const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

// test();

// async function test (){
//     const browser = await chromium.launch();
//     const page = await browser.newPage();
//     await page.goto('https://softuni.bg/');
//     await page.screenshot({ path: `softuni.png` });
//     await browser.close();
// };


let browser, page; // Declare reusable variables


describe('E2E tests', async function() {
    this.timeout(9000);
   before(async () => { browser = await chromium.launch(); });
   after(async () => { await browser.close(); });
   beforeEach(async () => { page = await browser.newPage(); });
   afterEach(async () => { await page.close(); });
   
   it('works', async () => {
    await page.goto('https://softuni.bg');
    await page.screenshot({path:'test.png'});
    expect(1).to.equal(1);
    });
});