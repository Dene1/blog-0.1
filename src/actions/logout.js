import {ACTION_TYPE} from "./action-type.js"
import {server} from "../bff"

export const logout = (session) => {

    server.logout(session)

    return {
        type: ACTION_TYPE.LOGOUT,
    }
}
