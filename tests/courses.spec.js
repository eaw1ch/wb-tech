const { test, expect } = require('@playwright/test')
const CoursePage = require('../pages/coursePage')

test.describe('Курсы. Интеграция', () => {
    test('Получение информации о публичных курсах', async () => {
        // Подготовка данных
        const coursePage = new CoursePage()

        // Отправка запроса и получение результатов
        const response = await coursePage.getCoursesPublic(1, 10, 0)
        const responseData = response.data

        // Проверка ответа
        expect(response.status).toBe(200)
        expect(responseData).toBeTruthy()
        expect(typeof responseData).toBe('object')
        expect(Array.isArray(responseData.data)).toBe(true)
        expect(responseData.data.length).toBeGreaterThan(0)
    })

    test('Получение списка курсов и информации о записи студента на курс', async () => {
        // Подготовка данных
        const coursePage = new CoursePage()

        // Отправка запроса и получение результатов
        const response = await coursePage.getCourses()
        const responseData = response.data

        const courses = response.data.data
        const course = courses.find((course) => course.id === 11)

        // Проверка ответа
        expect(response.status).toBe(200)
        expect(responseData).toBeTruthy()
        expect(course).toBeTruthy()
        expect(course.is_enrolled).toBe(true)
        expect(course.group_exists).toBe(true)
    })

    test('Получение информации о курсе по ID', async () => {
        // Подготовка данных
        const coursePage = new CoursePage()
        const courseID = 11
        const expectSlug = 'manual-testing'

        // Отправка запроса и получение результатов
        const response = await coursePage.getCourseById(courseID)
        const responseData = response.data

        // Проверка ответа
        expect(response.status).toBe(200)
        expect(responseData).toBeTruthy()
        expect(typeof responseData).toBe('object')
        expect(responseData.id).toBe(courseID)
        expect(responseData.slug).toBe(expectSlug)
    })

    test('Получение информации о структуре курса и назначенных студенту задач', async () => {
        // Подготовка данных
        const coursePage = new CoursePage()
        const courseID = 11
        const titlesArr = [
            'Введение в тестирование',
            'Поиск уязвимостей',
            'Тестирование мобильных приложений',
            'Тестирование веб-приложений',
            'Снифферы',
            'Q&A',
            'Итоговый проект',
            'Выпускной',
        ]

        // Отправка запроса и получение результатов
        const response = await coursePage.getMaterials(courseID)
        const responseData = response.data

        // Проверка ответа
        expect(response.status).toBe(200)
        expect(responseData).toBeTruthy()
        expect(typeof responseData).toBe('object')
        expect(responseData.data.length).toBe(8)

        for (let i = 0; i < titlesArr.length; i++) {
            expect(responseData.data[i].title).toBe(titlesArr[i])
        }
    })
})
