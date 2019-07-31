const puppeteer = require("puppeteer")
const devices = require("puppeteer/DeviceDescriptors")
const iPhone = devices["iPhone 6"]

const cookie = {
  z_c0:
    '"2|1:0|10:1563939677|4:z_c0|80:MS4xeG9PU0J3QUFBQUFYQUFBQVlRSlZUVjBoSlY0cGpKYWJsXzNkVHRPN1VRRERvQm1Gc1FVMnBRPT0=|fc1ad60e38bf3d801006daa657162122ec69bdf80777e3bb3b300c82f454847e"'
}

const app = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  try {
    await page.setCookie({
      url: "http://localhost:3001/",
      name: "z_c0",
      value:
        '"2|1:0|10:1563939677|4:z_c0|80:MS4xeG9PU0J3QUFBQUFYQUFBQVlRSlZUVjBoSlY0cGpKYWJsXzNkVHRPN1VRRERvQm1Gc1FVMnBRPT0=|fc1ad60e38bf3d801006daa657162122ec69bdf80777e3bb3b300c82f454847e"'
    })
    // page.on("console", msg => console.log("PAGE LOG:", msg))
    // page.on('console', msg => {
    //   for (let i = 0; i < msg.args().length; ++i)
    //     console.log(`${i}: ${msg.args()[i]}`);
    // });
    // page.on("error", err => {
    //   theTempValue = err.toString()
    //   console.log("Page error: " + theTempValue)
    // })
    // page.on("pageerror", err => {
    //   theTempValue = err.toString()
    //   console.log("Page pageerror: ", theTempValue)
    // })
    await page.goto("http://www.zhihu.com")
    await page.screenshot({path: "src/screenshot/example.png", fullPage: true})
    await browser.close()
  } catch (error) {
    console.log("error", error)
  }
}

// app()

const jdSearch = async () => {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  try {
    await page.goto(
      "https://pro.m.jd.com/mall/active/ZaDfazC4EPT5y8K7YqVbzjMAQKA/index.html?source=1"
    )
    await page.type(".search_bar input", "iphone")
    await page.keyboard.up("Enter")
    await page.waitForNavigation()
    await page.screenshot({path: "src/screenshot/example.png", fullPage: true})
    await browser.close()
  } catch (error) {
    console.log("error", error)
  }
}

const jdBannerClick = async () => {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  await page.emulate(iPhone)
  try {
    await page.goto(
      "https://pro.m.jd.com/mall/active/ZaDfazC4EPT5y8K7YqVbzjMAQKA/index.html?source=1"
    )
    const banner = await page.$(".wrap.jdui_slide > ul")
    await banner.click()
    await page.waitForNavigation()
    await page.screenshot({path: "src/screenshot/example.png", fullPage: false})
    await browser.close()
  } catch (error) {
    console.log("error", error)
  }
}

const bluePage = async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.emulate(iPhone)
  page.on("error", err => {
    const theTempValue = err.toString()
    console.log("页面崩溃错误:" + theTempValue)
  })
  page.on("pageerror", err => {
    const theTempValue = err.toString()
    console.log("未捕获错误:", theTempValue)
  })
  const scrollable_section = ".BrandBluePageCars-SwipLayout-wrapper"
  try {
    await page.goto(
      "https://www.zhihu.com/appview/brand/bluePage/19574850/intro"
    )
    const btn = await page.$(".BrandBluePageOrgInfo-btn")
    await btn.click()
    await page.waitForSelector(scrollable_section)
    // 滚动
    const result = await page.evaluate(selector => {
      const scrollableSection = document.querySelector(selector)
      scrollableSection.scrollLeft = 200
    }, scrollable_section)
    await page.screenshot({path: "src/screenshot/example.png", fullPage: false})
    // await browser.close()
  } catch (error) {
    console.log("error", error)
  }
}

bluePage()
