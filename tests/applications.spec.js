const { test, expect } = require('@playwright/test')
const ApplicationPage = require('../pages/applicationPage')

test.describe('Создание заявки. Интеграция', () => {
    test('Создание заявки и пользователя, если его еще не было', async () => {
        // Подготовка данных
        const applicationPage = new ApplicationPage()
        const profileData = {
            course_id: 5,
            firstname: 'Тесто',
            lastname: 'Тестов',
            telegram: '@test',
            phone: '+79997777777',
            email: 'test@mail.ru',
            resumelink: 'https://resume',
            employer_id: 0,
            github_link: 'https://github.com/test',
        }

        // Отправка запроса и получение результатов
        const response = await applicationPage.createRequest(profileData)
        const responseData = response.data

        // Проверка ответа
        expect(response.status).toBe(200)
        expect(responseData).toBeTruthy()
    })
})
