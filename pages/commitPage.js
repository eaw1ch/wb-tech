const BasePage = require('./basePage')

require('dotenv').config()

class CommitPage extends BasePage {
    constructor() {
        super()
        this.getTasksEndpoint = '/api/v1/tasks'
        this.pushCommitEndpoint = '/api/v1/tasks'

        this.authHeaders = {
            Authorization: `Bearer ${process.env.TOKEN}`,
            Cookie: process.env.COOKIE,
        }
    }

    async getTasks() {
        const headers = this.authHeaders
        const response = await this.request(
            'GET',
            this.getTasksEndpoint,
            {},
            headers
        )
        return response
    }

    async pushCommit(message, taskID) {
        const headers = this.authHeaders
        const response = await this.request(
            'POST',
            this.pushCommitEndpoint + `/${taskID}/commit`,
            {},
            headers,
            { comment: message }
        )
        return response
    }

    async updateCommit(message, taskID, commitID) {
        const headers = this.authHeaders
        const response = await this.request(
            'PUT',
            this.pushCommitEndpoint + `/${taskID}/commit/${commitID}`,
            {},
            headers,
            { comment: message }
        )
        return response
    }

    async getInfoAboutMark(taskID) {
        const headers = this.authHeaders
        const response = await this.request(
            'GET',
            this.pushCommitEndpoint + `/${taskID}/commit`,
            {},
            headers
        )
        return response
    }
}

module.exports = CommitPage
