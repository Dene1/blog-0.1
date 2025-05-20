import {ACTION_TYPE} from "./action-type.js"

export const addComment = (comment) => ({
    type: ACTION_TYPE.ADD_COMMENT,
    payload: comment,
})
