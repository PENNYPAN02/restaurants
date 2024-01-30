import { test, expect } from '@playwright/test';
import { BrowseWrapper } from '../infra/browser/browser';
import configJson from '../../config.json';
import { RestaurantPage } from '../logic/page/restaurant-page';

test.describe('Base UI Test', () => {
  let browser: BrowseWrapper;
  let restaurantPage: RestaurantPage;

  test.beforeAll(async () => {
    browser = new BrowseWrapper();
  })

  test.beforeEach(async () => {
    restaurantPage = await browser.newPage(RestaurantPage, configJson.baseUiUrl);
  })

  test.afterEach(async () => {
    await browser.closeContext();
  })

  test.afterAll(async () => {
    await browser.close();
  })

  test('Create, Delete and Validate a New Restaurant', async () => {
    await restaurantPage.clickCreateNewRestaurantButton();
    await restaurantPage.giveRestaurantDetails();
    await restaurantPage.clickSubmitButton();

    // Checking if the pop-up is visible after creation
    expect(await restaurantPage.returnCreatedPopUpTitle()).toBe(true);
    await restaurantPage.clickOkButton();

    // Checking if the new restaurant is created and visible in the list
    expect(await restaurantPage.returnNewRestaurantRow()).toBeTruthy();

    // Deleting the restaurant
    await restaurantPage.clickDeleteRestaurantButton();

    // Checking if the pop-up is visible after deletion
    expect(await restaurantPage.returnDeletedPopUpTitle()).toBe(true);
    await restaurantPage.clickOkButton();

    // Checking if the restaurant is no longer visible after deletion
    expect(await restaurantPage.returnRestaurantRowAfterDelete()).toBeFalsy();
  });
});
