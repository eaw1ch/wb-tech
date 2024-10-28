const { test, expect } = require('@playwright/test')
const UserPage = require('../pages/userPage')

test.describe('Профиль пользователя. Интеграция', () => {
    test('Получение данных о текущем пользователе', async () => {
        // Подготовка данных
        const userPage = new UserPage()
        const userID = 1930
        const userName = 'Сергей'
        const userSurname = 'Двойнев'

        // Отправка запроса и получение результатов
        const response = await userPage.getUserInfo()
        const responseData = response.data

        // Проверка ответа
        expect(response.status).toBe(200)
        expect(responseData).toBeTruthy()
        expect(responseData.id).toBe(userID)
        expect(responseData.firstname).toBe(userName)
        expect(responseData.lastname).toBe(userSurname)
    })

    test('Обновление профиля пользователя', async () => {
        // Подготовка данных
        const userPage = new UserPage()
        const profileUpdateData = {
            firstname: 'Сергей',
            middlename: 'Геннадьевич',
            lastname: 'Двойнев',
            telegram: '123',
            email: 'eaw1ch@mail.ru',
        }

        // Отправка запроса и получение результатов
        const response = await userPage.updateProfile(profileUpdateData)
        const responseData = response.data

        // Проверка ответа
        expect(response.status).toBe(200)
        expect(responseData).toBeTruthy()
    })

    test('Принятие Пользовательского Соглашения', async () => {
        // Подготовка данных
        const userPage = new UserPage()

        // Отправка запроса и получение результатов
        const response = await userPage.acceptAgreement()
        const responseData = response.data

        // Проверка ответа
        expect(response.status).toBe(200)
        expect(responseData).toBeTruthy()
    })

    test('Создание заявки на удаление профиля', async () => {
        // Подготовка данных
        const userPage = new UserPage()

        // Отправка запроса и получение результатов
        const response = await userPage.deleteProfileRequest()
        const responseData = response.data

        // Проверка ответа
        expect(response.status).toBe(200)
        expect(responseData).toBeTruthy()
    })

    test('Отмена заявки на удаление профиля', async () => {
        // Подготовка данных
        const userPage = new UserPage()

        // Отправка запроса и получение результатов
        const response = await userPage.cancelDelete()
        const responseData = response.data

        // Проверка ответа
        expect(response.status).toBe(200)
        expect(responseData).toBeTruthy()
    })
})
