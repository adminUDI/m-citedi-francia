const {chromium} = require('C:/Users/UDI/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('path');
const fs = require('fs');
(async()=>{
 const base=process.cwd(); const out=path.join(base,'work','qa-participantes');fs.mkdirSync(out,{recursive:true});
 process.env.TEMP=out;process.env.TMP=out;
 const browser=await chromium.launchPersistentContext(path.join(out,'browser-profile'),{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--disable-background-networking'],viewport:{width:1440,height:1000}});
 const page=browser.pages()[0];const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://www.googletagmanager.com/**',r=>r.abort());
 await page.goto('file:///'+base.replace(/\\/g,'/')+'/index.html');
 await page.evaluate(()=>document.fonts.ready);
 for(const width of [1440,390,320]){
  await page.setViewportSize({width,height:1000});
  await page.locator('#participantes').screenshot({path:path.join(out,`participantes-${width}.png`)});
  console.log(JSON.stringify({width,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),cards:await page.locator('#participantes .tarjeta').count(),brokenImages:await page.locator('img').evaluateAll(es=>es.filter(e=>!e.complete||!e.naturalWidth).map(e=>e.src))}));
  for(const id of ['gladys','ciro','sergio-ciro']){
   await page.locator(`[data-profile="${id}"]`).click();
   await page.locator('#perfil-modal').screenshot({path:path.join(out,`${id}-${width}.png`)});
   console.log(JSON.stringify({width,profile:id,title:await page.locator('#perfil-nombre').textContent(),overflow:await page.locator('#perfil-modal').evaluate(e=>e.scrollWidth>e.clientWidth),photos:await page.locator('#perfil-modal img').evaluateAll(es=>es.map(e=>({loaded:e.complete&&e.naturalWidth>0,position:getComputedStyle(e).objectPosition})))}));
   await page.locator('.modal-cerrar').click();
  }
  await page.locator('.agenda li').filter({hasText:'Investigación enfocada'}).screenshot({path:path.join(out,`programa-${width}.png`)});
 }
 console.log(JSON.stringify({errors}));await browser.close();
})();
