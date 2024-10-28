const BasePage = require('./basePage')

require('dotenv').config()

class CoursePage extends BasePage {
    constructor() {
        super()
        this.getCoursesPublicEndpoint = '/api/v1/public/courses'
        this.getCoursesEndpoint = `/api/v1/courses`

        this.authHeaders = {
            Authorization: `Bearer ${process.env.TOKEN}`,
            Cookie: process.env.COOKIE,
        }
    }

    async getCoursesPublic(category_id, limit, offset) {
        const params = { category_id, limit, offset }
        const response = await this.request(
            'GET',
            this.getCoursesPublicEndpoint,
            params
        )
        return response
    }

    async getCourses() {
        const headers = this.authHeaders
        const response = await this.request(
            'GET',
            this.getCoursesEndpoint,
            {},
            headers
        )
        return response
    }

    async getCourseById(courseID) {
        const headers = this.authHeaders
        const response = await this.request(
            'GET',
            this.getCoursesPublicEndpoint + `/${courseID}`,
            {},
            headers
        )
        return response
    }

    async getMaterials(courseID) {
        const headers = this.authHeaders
        const response = await this.request(
            'GET',
            this.getCoursesEndpoint + `/${courseID}/material`,
            {},
            headers
        )
        return response
    }
}

module.exports = CoursePage
