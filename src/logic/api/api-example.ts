import { getRequest, postRequest } from '../../infra/rest/api-request'
import configJson from '../../../candidate_test_playwright/config.json'

export class ApiExample {

    static getDataExample = async (url: string) => {
        return await getRequest(url)
    }
}
