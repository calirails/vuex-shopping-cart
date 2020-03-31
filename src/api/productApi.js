/**
 * Mocking client-server processing
 */
const _products = [
  {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
  {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
  {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5},
  {"id": 4, "title": "Billie Eilish CD", "price": 29.99, "inventory": 1}
]

export default {
  getProducts (cb) {
    // NOTE: for illustrative purposes only, we've set the callback wait time to 
    //       1.5 seconds to accentuate the loading animation. Feel free to it dial down.
    setTimeout(() => cb(_products), 1500)
  },

  buyProducts (products, successCb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.webdriver)
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? successCb()
        : errorCb()
    }, 100)
  }
}
