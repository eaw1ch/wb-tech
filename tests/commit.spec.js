const { test, expect } = require('@playwright/test')
const CommitPage = require('../pages/commitPage')

test.describe('Задачи и коммиты. Интеграция', () => {
    test('Получить все задачи', async () => {
        // Подготовка данных
        const commitPage = new CommitPage()

        // Отправка запроса и получение результатов
        const response = await commitPage.getTasks()
        const responseData = response.data

        // Проверка ответа
        expect(response.status).toBe(200)
        expect(responseData).toBeTruthy()
        expect(responseData.total).toBe(3)
        expect(responseData.data[0].title).toBe('Экзамен по 1 модулю')
        expect(responseData.data[1].title).toBe('Экзамен по 2 модулю')

        console.log(responseData)
    })

    test('Создание коммита пользователем', async () => {
        // Подготовка данных
        const commitPage = new CommitPage()
        const message = 'API Testing by autotest new'
        const taskID = 35395

        // Отправка запроса и получение результатов
        const response = await commitPage.pushCommit(message, taskID)
        const responseData = response.data

        // Проверка ответа
        expect(response.status).toBe(200)
        expect(responseData).toBeTruthy()
        expect(responseData).toBe('Решение отправлено')
    })

    test('Обновление коммита пользователем', async () => {
        // Подготовка данных
        const commitPage = new CommitPage()
        const message = 'Update commit by autotest'
        const taskID = 35572
        const commitID = 3564

        // Отправка запроса и получение результатов
        const response = await commitPage.updateCommit(
            message,
            taskID,
            commitID
        )
        const responseData = response.data

        // Проверка ответа
        expect(response.status).toBe(200)
        expect(responseData).toBeTruthy()
        expect(responseData.message).toBe('Успешно')
    })

    test('Получение информации об оценке', async () => {
        // Подготовка данных
        const commitPage = new CommitPage()
        const taskID = 35395

        // Отправка запроса и получение результатов
        const response = await commitPage.getInfoAboutMark(taskID)
        const responseData = response.data

        // Проверка ответа
        expect(response.status).toBe(200)
        expect(responseData).toBeTruthy()
        expect(typeof responseData.total).toBe('number')
        expect(responseData.total).toBeGreaterThan(0)
        expect(responseData.data.length).toBeGreaterThan(0)
    })
})
