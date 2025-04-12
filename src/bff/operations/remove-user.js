import {ROLE} from "../constants"
import {sessions} from "../sessions.js"
import {deleteUser} from "../api"

export const removeUser = async (hash, userId) => {
    const accessRoles = [ROLE.ADMIN]

    const access = await sessions.access(hash, accessRoles)

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        }
    }

    await deleteUser(userId)

    return {
        error: null,
        res: true,
    }
}
