describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/index.html');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements were found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    let data, plainValue;
    // Query select all of the <product-item> elements
    const prodItems = await page.$$('product-item');
    // Make sure the title, price, and image are populated in the JSON for each product item
    for (let i = 0; i < prodItems.length; i++) {
      console.log(`Checking product item ${i+1}/${prodItems.length}`);
      // Grab the .data property of <product-items> to grab all of the json data stored inside
      data = await prodItems[i].getProperty('data');
      // Convert that property to JSON
      plainValue = await data.jsonValue();
      // Make sure the title, price, and image are populated in the JSON
      if (plainValue.title.length === 0 || plainValue.price.length === 0 || plainValue.image.length === 0) {
        allArePopulated = false;
        break; // Exit the loop if any item is not populated
      }
    }
    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);
  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    // Query a <product-item> element and grab its shadowRoot
    const productItem = await page.$('product-item');
    const shadowRoot = await productItem.shadowRoot;
    // Query the button inside the shadowRoot
    const button = await shadowRoot.$('button');
    // Click the button
    await button.click();
    // Check the innerText property of the button
    const buttonText = await button.innerText();
    // Expect the button text to be "Remove from Cart"
    expect(buttonText).toBe('Remove from Cart');
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    // Query select all of the <product-item> elements
    const prodItems = await page.$$('product-item');
    // Iterate through each product item and click its "Add to Cart" button
    for (let i = 0; i < prodItems.length; i++) {
      const productItem = prodItems[i];
      const shadowRoot = await productItem.shadowRoot;
      const button = await shadowRoot.$('button');
      await button.click();
    }
    // Check if the innerText of #cart-count is 20
    const cartCount = await page.$eval('#cart-count', (element) => element.innerText);
    expect(cartCount).toBe('20');
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // Reload the page
    await page.reload();
    // Wait for the product items to load again
    await page.waitForSelector('product-item');
    // Check if all buttons say "Remove from Cart"
    const allButtons = await page.$$('product-item button');
    for (const button of allButtons) {
      const buttonText = await button.innerText();
      expect(buttonText).toBe('Remove from Cart');
    }
    // Check if the innerText of #cart-count is still 20
    const cartCount = await page.$eval('#cart-count', (element) => element.innerText);
    expect(cartCount).toBe('20');
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // At this point, the 'cart' item in localStorage should be '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]'
    const cartItems = await page.evaluate(() => {
      const cart = localStorage.getItem('cart');
      return JSON.parse(cart);
    });
    // Check if the cartItems array is correct
    expect(cartItems).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
  });

  // Checking to make sure that if you remove all of the items from the cart, the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    // Query select all of the <product-item> elements
    const prodItems = await page.$$('product-item');
    // Iterate through each product item and click its "Remove from Cart" button
    for (let i = 0; i < prodItems.length; i++) {
      const productItem = prodItems[i];
      const shadowRoot = await productItem.shadowRoot;
      const button = await shadowRoot.$('button');
      await button.click();
    }
    // Check if the innerText of #cart-count is now 0
    const cartCount = await page.$eval('#cart-count', (element) => element.innerText);
    expect(cartCount).toBe('0');
  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // Reload the page
    await page.reload();
    // Wait for the product items to load again
    await page.waitForSelector('product-item');
    // Check if all buttons say "Add to Cart"
    const allButtons = await page.$$('product-item button');
    for (const button of allButtons) {
      const buttonText = await button.innerText();
      expect(buttonText).toBe('Add to Cart');
    }
    // Check if the innerText of #cart-count is now 0
    const cartCount = await page.$eval('#cart-count', (element) => element.innerText);
    expect(cartCount).toBe('0');
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // At this point, the 'cart' item in localStorage should be '[]'
    const cartItems = await page.evaluate(() => {
      const cart = localStorage.getItem('cart');
      return JSON.parse(cart);
    });
    // Check if the cartItems array is empty
    expect(cartItems).toEqual([]);
  });
});
