import {deleteComment, getComments, getPost} from "../api"
import {sessions} from "../sessions.js"
import {ROLE} from "../constants/index.js"

export const removePostComment = async (hash, postId, id) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR]

    const access = await sessions.access(hash, accessRoles)

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        }
    }

    await deleteComment(id)

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
