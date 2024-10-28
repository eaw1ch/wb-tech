const BasePage = require('./basePage')

require('dotenv').config()

class UserPage extends BasePage {
    constructor() {
        super()
        this.getUserInfoEndpoint = '/api/v1/me'
        this.updateProfileEndpoint = '/api/v1/profile'
        this.deleteProfileRequestEndpoint = '/api/v1/profile/delete-request'
        this.acceptAgreementEndpoint = '/api/v1/me/agreement'

        this.authHeaders = {
            Authorization: `Bearer ${process.env.TOKEN}`,
            Cookie: process.env.COOKIE,
        }
    }

    async getUserInfo() {
        const headers = this.authHeaders
        const response = await this.request(
            'GET',
            this.getUserInfoEndpoint,
            {},
            headers
        )
        return response
    }

    async updateProfile(newData) {
        const headers = this.authHeaders

        const response = await this.request(
            'PUT',
            this.updateProfileEndpoint,
            {},
            headers,
            newData
        )
        return response
    }

    async deleteProfileRequest() {
        const headers = this.authHeaders

        const response = await this.request(
            'POST',
            this.deleteProfileRequestEndpoint,
            {},
            headers
        )
        return response
    }

    async cancelDelete() {
        const headers = this.authHeaders

        const response = await this.request(
            'DELETE',
            this.deleteProfileRequestEndpoint,
            {},
            headers
        )
        return response
    }

    async acceptAgreement() {
        const headers = this.authHeaders

        const response = await this.request(
            'PUT',
            this.acceptAgreementEndpoint,
            {},
            headers
        )
        return response
    }
}

module.exports = UserPage
