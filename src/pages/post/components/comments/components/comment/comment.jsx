import {Icon} from "../../../../../../components"
import {CLOSE_MODAL, openModal, removeCommentAsync} from "../../../../../../actions"
import {useDispatch} from "react-redux"
import {useServerRequest} from "../../../../../../hooks"
import styled from "styled-components"

const CommentContainer = ({className, postId, id, author, content, publishedAt}) => {
    const dispatch = useDispatch()
    const requestServer = useServerRequest()

    const onCommentRemove = (id) => {
        dispatch(openModal({
            text: "Удалить комментарий?",
            onConfirm: () => {
                dispatch(removeCommentAsync(requestServer, postId, id));
                dispatch(CLOSE_MODAL);
            },
            onCancel: () => dispatch(CLOSE_MODAL),
        }))
    }

    return (
        <div className={className}>
            <div className="comment">
                <div className="information-panel">
                    <div className="author">
                        <Icon id="fa-user-circle-o" margin="0 7px 0 0" size="18px"/>
                        {author}
                    </div>
                    <div className="published-at">
                        <Icon id="fa-calendar-o" margin="0 7px 0 0" size="18px"/>
                        {publishedAt}
                    </div>
                </div>
                <div className="comment-text">{content}</div>
            </div>
            <Icon id="fa-trash-o" margin="5px 0 0 10px" size="20px"
                  onClick={() => onCommentRemove(id)}
            />
        </div>
    )
}

export const Comment = styled(CommentContainer)`
    display: flex;
    margin-top: 10px;

    .comment {
        border: 1px solid black;
        padding: 5px 10px;
        width: 550px;
    }

    .information-panel {
        display: flex;
        justify-content: space-between;
    }

    .author {
        display: flex;
    }

    .published-at {
        display: flex;
    }

    .comment-text {
        margin: 10px 0 0;
    }
`
