import prisma from "../lib/prisma"

export default async function register(name, password, email) {
    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                password: password,
                email: email,
            }
        })
        return user 
    } catch (error) {
        console.error("Ошибка при создании пользователя:", error)
        return { error: "Не удалось создать пользователя" }
    }
}
