
import { Page } from '@playwright/test'
import { ComponentBase } from './component-base'

export class BasePage extends ComponentBase {
  constructor(page: Page) {
    super(page)
  }

  async initPage() {
 
  }

  bringToFront = async () => {
    return this.page.bringToFront()
  }

  close = async () => {
    return this.page.close()
  }

  reloadPage = async () => {
    await this.page.reload()
  }
}
