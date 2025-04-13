import {addSession, deleteSession, getSession,} from "./api/index.js"

export const sessions = {
    create(user) {
        const hash = Math.random().toFixed(50)

        addSession(hash, user)

        return hash
    },
    async remove(hash) {
        const session = await getSession(hash)

        if (!session) {
            return
        }

        deleteSession(session.id)
    },

    async access(hash, accessRoles) {
        const dbSession = await getSession(hash)

        if (dbSession && dbSession.user) {
            return accessRoles.includes(dbSession.user.roleId)
        } else {
            console.warn("Session not found or user is missing in session:", hash)
            return false
        }
    }
}
