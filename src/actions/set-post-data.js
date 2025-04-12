import {ACTION_TYPE} from "./action-type.js"

export const setPostData = (postData) => ({
    type: ACTION_TYPE.SET_POST_DATA,
    payload: postData,
})
