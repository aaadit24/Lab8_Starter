describe('Basic user flow for Website', () => {
    // First, visit the lab 8 website
    beforeAll(async () => {
      await page.goto('https://cse110-f2021.github.io/Lab8_Website');
    });
  
    // Next, check to make sure that all 20 <product-item> elements have loaded
    it('Initial Home Page - Check for 20 product items', async () => {
      console.log('Checking for 20 product items...');
      const numProducts = await page.$$eval('product-item', (prodItems) => {
        return prodItems.length;
      });
      expect(numProducts).toBe(20);
    });
  
    // Check to make sure that all 20 <product-item> elements have data in them
    it('Make sure <product-item> elements are populated', async () => {
      console.log('Checking to make sure <product-item> elements are populated...');
      let allArePopulated = true;
      let data, plainValue;
      const prodItems = await page.$$('product-item');
      for (const prodItem of prodItems) {
        data = await prodItem.getProperty('data');
        plainValue = await data.jsonValue();
        if (
          plainValue.title.length === 0 ||
          plainValue.price.length === 0 ||
          plainValue.image.length === 0
        ) {
          allArePopulated = false;
          break;
        }
      }
      expect(allArePopulated).toBe(true);
    }, 10000);
  
    // Check to make sure that when you click "Add to Cart" on the first <product-item> that
    // the button swaps to "Remove from Cart"
    it('Clicking the "Add to Cart" button should change button text', async () => {
      console.log('Checking the "Add to Cart" button...');
      const productItem = await page.$('product-item');
      const shadowRoot = await productItem.getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      await button.click();
      const buttonText = await page.evaluate((button) => button.innerText, button);
      expect(buttonText).toBe('Remove from Cart');
      await button.click();
    }, 2500);
  
    // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
    // number in the top right has been correctly updated
    it('Checking number of items in cart on screen', async () => {
      console.log('Checking number of items in cart on screen...');
      const prodItems = await page.$$('product-item');
      for (const prodItem of prodItems) {
        const shadowRoot = await prodItem.getProperty('shadowRoot');
        const button = await shadowRoot.$('button');
        await button.click();
      }
      const count = await page.$('#cart-count');
      const inner = await count.getProperty('innerText');
      let text = await inner.jsonValue();
      expect(text).toBe('20');
    }, 10000);
  
    // Check to make sure that after you reload the page it remembers all of the items in your cart
    it('Checking number of items in cart on screen after reload', async () => {
      console.log('Checking number of items in cart on screen after reload...');
      await page.reload();
      await page.waitForSelector('product-item');
      const prodItems = await page.$$('product-item');
      for (const prodItem of prodItems) {
        const shadowRoot = await prodItem.getProperty('shadowRoot');
        const button = await shadowRoot.$('button');
        const buttonText = await page.evaluate((button) => button.innerText, button);
        expect(buttonText).toBe('Remove from Cart');
      }
      const cartCount = await page.$eval('#cart-count', (element) => element.innerText);
      expect(cartCount).toBe('20');
    }, 10000);
  
    // Check to make sure that the cart in localStorage is what you expect
    it('Checking the localStorage to make sure cart is correct', async () => {
      console.log('Checking the localStorage...');
      const cartItems = await page.evaluate(() => {
        return JSON.parse(localStorage.getItem('cart'));
      });
      const expectedCartItems = Array.from({ length: 20 }, (_, index) => index + 1);
      expect(cartItems).toEqual(expectedCartItems);
    });
  
    // Checking to make sure that if you remove all of the items from the cart, the cart
    // number in the top right of the screen is 0
    it('Checking number of items in cart on screen after removing from cart', async () => {
      console.log('Checking number of items in cart on screen...');
      const prodItems = await page.$$('product-item');
      for (const prodItem of prodItems) {
        const shadowRoot = await prodItem.getProperty('shadowRoot');
        const button = await shadowRoot.$('button');
        await button.click();
      }
      await page.waitForFunction(() => {
        const cartCount = document.querySelector('#cart-count');
        return cartCount && cartCount.innerText === '0';
      });
      const cartCount = await page.$eval('#cart-count', (element) => element.innerText);
      expect(cartCount).toBe('0');
    }, 10000);
  
    // Checking to make sure that it remembers us removing everything from the cart
    // after we refresh the page
    it('Checking number of items in cart on screen after reload', async () => {
      console.log('Checking number of items in cart on screen after reload...');
      await page.reload();
      await page.waitForSelector('product-item');
      const prodItems = await page.$$('product-item');
      for (const prodItem of prodItems) {
        const shadowRoot = await prodItem.getProperty('shadowRoot');
        const button = await shadowRoot.$('button');
        const buttonText = await page.evaluate((button) => button.innerText, button);
        expect(buttonText).toBe('Add to Cart');
      }
      const cartCount = await page.$eval('#cart-count', (element) => element.innerText);
      expect(cartCount).toBe('0');
    }, 10000);
  
    // Checking to make sure that localStorage for the cart is as we'd expect for an empty cart
    it('Checking the localStorage to make sure cart is correct', async () => {
      console.log('Checking the localStorage...');
      const cartItems = await page.evaluate(() => {
        return JSON.parse(localStorage.getItem('cart'));
      });
      expect(cartItems).toEqual([]);
    });
  });
  