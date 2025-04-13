import {ROLE} from "../constants"
import {sessions} from "../sessions.js"
import {addPost, updatePost} from "../api/index.js"

export const savePost = async (hash, newPostData) => {
    const accessRoles = [ROLE.ADMIN]

    const access = await sessions.access(hash, accessRoles)

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        }
    }

    const savedPost = newPostData.id === ""
        ? await addPost(newPostData)
        : await updatePost(newPostData)

    return {
        error: null,
        res: savedPost,
    }
}
