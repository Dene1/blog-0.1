import {ACTION_TYPE} from "./action-type.js"

export const removeComment = (commentId) => ({
    type: ACTION_TYPE.REMOVE_COMMENT,
    payload: commentId,
})
