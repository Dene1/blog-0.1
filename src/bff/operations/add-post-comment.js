import {addComment, getComments, getPost} from "../api"
import {sessions} from "../sessions.js"
import {ROLE} from "../constants/index.js"

export const addPostComment = async (hash, userId, postId, content) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]

    const access = await sessions.access(hash, accessRoles)

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        }
    }

    await addComment(userId, postId, content)

    const post = await getPost(postId)

    const comments = await getComments(postId)

    return {
        error: null,
        res: {
            ...post,
            comments,
        },
    }
}
