import {getUsers} from "./get-users.js"

export const getUser = async (loginToFind) => {
    const users = await getUsers()
    return users.find(({login}) => login === loginToFind)
}
