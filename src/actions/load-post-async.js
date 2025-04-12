import {setPostData} from "./set-post-data.js"

export const loadPostAsync = (requestServer, postId) => (dispatch) => {
    requestServer("fetchPost", postId).then((postData) => {
        dispatch(setPostData(postData.res))
    })
}
