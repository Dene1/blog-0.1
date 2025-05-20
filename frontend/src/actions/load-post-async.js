import {setPostData} from "./set-post-data.js"
import {request} from "../utils/request.js"

export const loadPostAsync = (postId) => (dispatch) =>
    request(`/api/posts/${postId}`).then((postData) => {
        if (postData.data) {
            console.log(postData.data)
            dispatch(setPostData(postData.data))
        }
        return postData
    })
