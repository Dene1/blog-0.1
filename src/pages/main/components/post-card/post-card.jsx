import styled from "styled-components"
import {Icon} from "../../../../components"
import {Link} from "react-router-dom"

const PostCardContainer = ({
                               className,
                               id,
                               title,
                               imageUrl,
                               publishedAt,
                               commentsCount
                           }) => {
    return (
        <div className={className}>
            <Link to={`/post/${id}`}>
                <img src={imageUrl ? imageUrl : undefined} alt={title}/>
                <div className="post-card-footer">
                    <h4>{title}</h4>
                    <div className="post-card-info">
                        <div className="published-at">
                            <Icon inactive={true}
                                  id="fa-calendar-o"
                                  margin="0 7px 0 0"
                                  size="18px"
                            />
                            {publishedAt}
                        </div>
                        <div className="comments-count">
                            <Icon
                                inactive={true}
                                id="fa-comment-o"
                                margin="0 7px 0 0"
                                size="18px"
                            />
                            {commentsCount}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export const PostCard = styled(PostCardContainer)`
    display: flex;
    flex-direction: column;
    width: 280px;
    margin: 20px;
    border: 1px solid black;

    img {
        display: block;
        width: 100%;
    }

    .post-card-footer {
        padding: 5px;
        border-top: 1px solid black;
    }

    h4 {
        margin: 0;
    }

    .post-card-info {
        display: flex;
        justify-content: space-between;
        margin-top: 3px;

    }

    .published-at {
        display: flex;
        align-items: center;
    }

    .comments-count {
        display: flex;
        align-items: center;
    }
`
