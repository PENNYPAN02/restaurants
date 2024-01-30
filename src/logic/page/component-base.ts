import { Page } from "@playwright/test"

export class ComponentBase {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }
}
