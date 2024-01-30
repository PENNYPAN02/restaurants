import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { delay, generateRandomString, getRandomInt } from "../../infra/utils";

const randomid = getRandomInt(999, 1)
const randomname = 'PennyTest_' + generateRandomString(4)
const randomaddress = 'Street ' + generateRandomString(6)
const randomscore = getRandomInt(10, 1)

export class RestaurantPage extends BasePage {

    private createNewResturantButton: Locator
    private IdInput: Locator
    private NameInput: Locator
    private AddressInput: Locator
    private ScoreInput: Locator
    private SubmitButton: Locator
    private CreatedPopUp: Locator
    private DeletedPopUp: Locator
    private OkButton: Locator
    private restaurantRow: Locator
    private DeleteRestaurantButton: Locator


    constructor(page: Page) {

        super(page);
        this.createNewResturantButton = this.page.locator("//button[contains(text(),'Create new')]")

        this.IdInput = this.page.locator('//*[@id="id"]')
        this.NameInput = this.page.locator('//*[@id="name"]')
        this.AddressInput = this.page.locator('//*[@id="address"]')
        this.ScoreInput = this.page.locator('//*[@id="score"]')

        this.SubmitButton = this.page.locator("//button[contains(text(),'Submit')]")
        this.CreatedPopUp = this.page.locator("//h2[contains(text(),'Created')]")
        this.DeletedPopUp = this.page.locator("//h2[contains(text(),'Deleted')]")
        this.OkButton = this.page.locator("//button[contains(text(),'OK')]")

        //the locator of the new created restaurant
        this.restaurantRow = this.page.locator('//*[@id="main-table"]//table/tbody/tr[td[contains(text(), "' + randomname + '")]]')
        this.DeleteRestaurantButton = this.page.locator('//*[@id="main-table"]//table/tbody/tr[td[contains(text(), "' + randomname + '")]]//button')


    }

    clickCreateNewRestaurantButton = async () => {
        await this.createNewResturantButton.click()
    }

    giveRestaurantDetails = async () => {

        await this.IdInput.fill(randomid.toString())
        await this.NameInput.fill(randomname)
        await this.AddressInput.fill(randomaddress)
        await this.ScoreInput.fill(randomscore.toString())
    }

    clickSubmitButton = async () => {
        await this.SubmitButton.click()
    }

    returnCreatedPopUpTitle = async () => {
        await this.CreatedPopUp.waitFor({ state: 'visible' })
        return this.CreatedPopUp.isVisible()
    }

    returnDeletedPopUpTitle = async () => {
        await this.DeletedPopUp.waitFor({ state: 'visible' })
        return this.DeletedPopUp.isVisible()
    }

    clickOkButton = async () => {
        await this.OkButton.click()
    }

    returnNewRestaurantRow = async () => {
        await this.restaurantRow.waitFor({ state: 'visible' })
        return this.restaurantRow.isVisible()
    }

    returnRestaurantRowAfterDelete = async () => {
        await this.restaurantRow.waitFor({ state: 'hidden' })
        return this.restaurantRow.isVisible()
    }

    clickDeleteRestaurantButton = async () => {
        await this.DeleteRestaurantButton.click()
    }
}