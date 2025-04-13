import {useEffect, useLayoutEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Comments, PostContent, PostForm} from "./components"
import {useMatch, useParams} from "react-router-dom"
import {useServerRequest} from "../../hooks"
import {loadPostAsync, RESET_POST_DATA} from "../../actions"
import {selectPost} from "../../selectors"
import styled from "styled-components"

const PostContainer = ({className}) => {
    const dispatch = useDispatch()
    const params = useParams()
    const isCreating = useMatch("/post")
    const isEditing = useMatch("/post/:id/edit")
    const requestServer = useServerRequest()
    const post = useSelector(selectPost)

    useLayoutEffect(() => {
        dispatch(RESET_POST_DATA)
    }, [dispatch, isCreating]);

    useEffect(() => {
        if (isCreating) {
            return
        }

        dispatch(loadPostAsync(requestServer, params.id))
    }, [dispatch, isCreating, params.id, requestServer]);

    return (
        <div className={className}>
            {isEditing || isCreating ? (
                <PostForm post={post}/>
            ) : (
                <>
                    <PostContent post={post}/>
                    <Comments comments={post.comments} postId={post.id}/>
                </>
            )}
        </div>
    )
}

export const Post = styled(PostContainer)`
    margin: 40px 0;
    padding: 0 80px;
`
