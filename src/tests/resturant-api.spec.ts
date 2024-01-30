import { test, expect } from '@playwright/test';
import { BrowseWrapper } from '../infra/browser/browser';
import restaurantsAPI from '../logic/api/restaurantsAPI';
import { generateRandomString, getRandomInt } from '../infra/utils';
import { Restaurant, NewRestaurantDetails, RestaurantInvalid } from '../logic/api/API-Request/get-restaurants-request';

test.describe('Base API test', () => {

    let browser: BrowseWrapper

    const restaurantData = {
        address: generateRandomString(10),
        id: getRandomInt(999, 100),
        name: generateRandomString(5),
        score: getRandomInt(99, 1)
    };


    test.beforeAll(async () => {
        browser = new BrowseWrapper()
        await restaurantsAPI.resetServer();
    })

    test.beforeEach(async () => {
        //await restaurantsAPI.resetServer();
    })

    test.afterEach(async () => {
        await browser.closeContext()
    })

    test.afterAll(async () => {
        await browser.close()
    })

    test('Create restaurants via api', async () => {

        //Arrange
        await restaurantsAPI.createRestaurant(restaurantData);

        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(restaurantData.id);

        //Assert
        if (getByIdResponse.status() === 200) {
            console.log('Restaurant with ID ' + restaurantData.id + ' is created successfully.');
        }
        else if (getByIdResponse.status() === 404) {
            console.log('Restaurant with ID ' + restaurantData.id + ' not found. Creation failed');
        }

        expect(getByIdResponse.status()).toEqual(200)
        expect(getByIdResponse.ok).toBeTruthy
    });


    test('Edit restaurant details', async () => {


        const newRestaurantData = {
            name: 'PennyName_' + generateRandomString(5),
            address: 'PennyAddress ' + generateRandomString(10),
            score: getRandomInt(99, 1),
        }

        // Arrange - Attempting to update
        const patchresponse = await restaurantsAPI.updateRestaurantById(restaurantData.id, newRestaurantData);

        // Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(restaurantData.id);

        // Assert
        console.log('Get by ID Response:', getByIdResponse.status(), getByIdResponse.ok);

        if (getByIdResponse.status() === 404) {
            console.log('Restaurant with ID ' + restaurantData.id + ' not found. Update failed.');
        }
        else if (patchresponse.status() === 404 && getByIdResponse.status() === 200) {
            console.log('Restaurant with ID ' + restaurantData.id + ' is found but failed to be updated.');
        }
        else if (patchresponse.status() === 200 && getByIdResponse.status() === 200) {
            console.log('Restaurant with ID ' + restaurantData.id + ' is found and updated.');
        }


        //const allRests = await restaurantsAPI.getRestaurants();
        //console.log('All restaurants after update:', await allRests.json());

        expect(getByIdResponse.status()).toEqual(200);
        expect(getByIdResponse.ok).toBeTruthy();
        expect(getByIdResponse.status()).toEqual(200);
        const updatedRestaurant = await getByIdResponse.json();
        expect(updatedRestaurant.name).toEqual(newRestaurantData.name);
        expect(updatedRestaurant.address).toEqual(newRestaurantData.address);
        expect(updatedRestaurant.score).toEqual(newRestaurantData.score);
    });


    test('Delete a restaurant', async () => {

        //Arrange
        await restaurantsAPI.deleteRestaurantById(restaurantData.id)

        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(restaurantData.id);

        //Assert
        if (getByIdResponse.status() === 200) {
            console.log('Restaurant with ID ' + restaurantData.id + ' is not deleted successfully.');
        }
        else if (getByIdResponse.status() === 404) {
            console.log('Restaurant with ID ' + restaurantData.id + ' deleted successfully');
        }

        expect(getByIdResponse.status()).toEqual(404)
        expect(getByIdResponse.ok).toBeFalsy()



    });
})


test('Create restaurant with invalid data', async () => {
    // Arrange - Prepare invalid data (missing required field)
    const invalidRestaurantData = {
        address: generateRandomString(10),
        name: generateRandomString(5),
        score: getRandomInt(99, 1)
    };

    // Act - Attempt to create a restaurant with invalid data
    const createResponse = await restaurantsAPI.createRestaurantInvalidData(invalidRestaurantData);


    // Assert - Verify the response indicates an error and contains the expected error message
    expect(createResponse.status()).toEqual(400); // Assuming 400 Bad Request for invalid data
    const responseBody = await createResponse.json();
    expect(responseBody.error).toEqual('Invalid data. Please provide all required fields.');
});

