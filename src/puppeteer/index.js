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
      url: "https://www.zhihu.com",
      name: "z_c0",
      value:
        '"2|1:0|10:1563939677|4:z_c0|80:MS4xeG9PU0J3QUFBQUFYQUFBQVlRSlZUVjBoSlY0cGpKYWJsXzNkVHRPN1VRRERvQm1Gc1FVMnBRPT0=|fc1ad60e38bf3d801006daa657162122ec69bdf80777e3bb3b300c82f454847e"'
    })
    await page.goto("https://www.zhihu.com")
    await page.screenshot({path: "src/screenshot/example.png", fullPage: true})
    await browser.close()
  } catch (error) {
    console.log(error)
  }
}

app()
