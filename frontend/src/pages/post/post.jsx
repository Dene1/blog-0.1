import {useEffect, useLayoutEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Comments, PostContent, PostForm} from "./components/index.js"
import {useMatch, useParams} from "react-router-dom"
import {loadPostAsync, RESET_POST_DATA} from "../../actions/index.js"
import {selectPost} from "../../selectors/index.js"
import styled from "styled-components"
import {Error, PrivateContent} from "../../components/index.js"
import {ROLE} from "../../constants/index.js"

const PostContainer = ({className}) => {
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const isCreating = !!useMatch("/post")
    const isEditing = !!useMatch("/post/:id/edit")
    const post = useSelector(selectPost)

    useLayoutEffect(() => {
        dispatch(RESET_POST_DATA)
    }, [dispatch, isCreating]);

    useEffect(() => {
        if (isCreating) {
            setIsLoading(false)
            return
        }

        dispatch(loadPostAsync(params.id)).then((postData) => {
            setError(postData.error)
            console.log(postData, params.id)
            setIsLoading(false)
        })
    }, [dispatch, isCreating, params.id]);

    if (isLoading) {
        return null
    }

    const SpecificPostPage = isCreating || isEditing ? (
        <PrivateContent access={[ROLE.ADMIN]}>
            <div className={className}>
                <PostForm post={post}/>
            </div>
        </PrivateContent>
    ) : (
        <div className={className}>
            <PostContent post={post}/>
            <Comments comments={post.comments} postId={post.id}/>
        </div>
    )

    return error ? <Error error={error}/> : SpecificPostPage
}

export const Post = styled(PostContainer)`
    margin: 40px 0;
    padding: 0 80px;
`
