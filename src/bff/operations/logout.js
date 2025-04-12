import {sessions} from "../sessions.js"

export const logout = async (userSession) => {
    sessions.remove(userSession)
}
