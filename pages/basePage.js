const axios = require('axios')

require('dotenv').config()

class BasePage {
    constructor() {
        this.baseUrl = process.env.BASE_URL || 'http://localhost:3000'
    }

    async request(method, endpoint, params = {}, headers = {}, data = {}) {
        try {
            const url = `${this.baseUrl}${endpoint}`
            const response = await axios({
                method: method,
                url: url,
                params: params,
                headers: headers,
                data: data,
            })
            return response
        } catch (error) {
            if (error.response) {
                console.error(
                    `Ошибка при выполнении запроса ${method} ${endpoint}:`,
                    error.response.data
                )
            } else {
                console.error(
                    `Ошибка при выполнении запроса ${method} ${endpoint}:`,
                    error.message
                )
            }
            throw error
        }
    }
}

module.exports = BasePage
