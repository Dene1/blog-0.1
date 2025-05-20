import {ACTION_TYPE} from "./action-type.js"
import {request} from "../utils/request.js"

export const logout = () => {

    request("/api/logout", "POST")

    return {
        type: ACTION_TYPE.LOGOUT,
    }
}
