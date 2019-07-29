const puppeteer = require("puppeteer")

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
    page.on('response', request => {
      console.log('123', request);
    });
    await page.goto("http://localhost:3001/")
    await page.screenshot({path: "src/screenshot/example.png", fullPage: true})

    // await browser.close()
  } catch (error) {
    console.log("error", error)
  }
}

app()
