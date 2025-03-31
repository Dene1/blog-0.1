import {getUser} from "./get-user.js"
import {addUser} from "./add-user.js"
import {createSession} from "./create-session.js"

export const server = {
    async authorize(authLogin, authPassword) {
        const user = await getUser(authLogin)

        if (!user) {
            return {
                error: "Такой пользователь не найден",
                res: null,
            }
        }

        if (authPassword !== user.password) {
            return {
                error: "Неверный пароль",
                res: null,
            }
        }

        return {
            error: null,
            res: createSession(user.role_id),
        }
    },

    async register(regLogin, regPassword) {
        const user = await getUser(regLogin)

        if (user) {
            return {
                error: "Такой пользователь уже есть",
                res: null,
            }
        }

        await addUser(regLogin, regPassword)

        return {
            error: null,
            res: createSession(user.role_id),
        }
    }
}
