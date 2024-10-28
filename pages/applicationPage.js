const BasePage = require('./basePage')

require('dotenv').config()

class ApplicationPage extends BasePage {
    constructor() {
        super()
        this.createRequestEndpoint = '/api/v1/applications'

        this.authHeaders = {
            Authorization: `Bearer ${process.env.TOKEN}`,
            Cookie: process.env.COOKIE,
        }
    }

    async createRequest(newData) {
        const headers = this.authHeaders
        const response = await this.request(
            'POST',
            this.createRequestEndpoint,
            {},
            headers,
            newData
        )
        return response
    }
}

module.exports = ApplicationPage
