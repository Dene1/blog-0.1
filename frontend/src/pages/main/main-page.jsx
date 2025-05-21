import {useEffect, useMemo, useState} from "react"
import {Pagination, PostCard, Search} from "./components/index.js"
import {PAGINATION_LIMIT} from "../../constants/index.js"
import {debounce} from "./utils/index.js"
import styled from "styled-components"
import {request} from "../../utils/request.js"

const MainContainer = ({className}) => {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [searchPhrase, setSearchPhrase] = useState("")
    const [shouldSearch, setShouldSearch] = useState(false)

    useEffect(() => {
        request(`/api/posts?searchPhrase=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`)
            .then(({data: {posts, lastPage}}) => {
                setPosts(posts)
                setLastPage(lastPage)
                console.log(posts)
            })
    }, [page, shouldSearch]);

    const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), [])

    const onSearch = ({target}) => {
        setSearchPhrase(target.value)
        startDelayedSearch(!shouldSearch)
    }

    return (
        <div className={className}>
            <div className="posts-and-search">
                <Search onChange={onSearch} searchPhrase={searchPhrase}/>
                {posts.length > 0 ? (<div className="post-list">
                    {posts.map(({id, title, imageUrl, publishedAt, comments}) =>
                        <PostCard key={id}
                                  id={id}
                                  title={title}
                                  imageUrl={imageUrl}
                                  publishedAt={publishedAt}
                                  commentsCount={comments.length}
                        />)}
                </div>) : (<div className="no-posts-found">Статьи не найдены</div>)}
            </div>
            {lastPage > 1 && posts.length > 0 && (
                <Pagination page={page} lastPage={lastPage} setPage={setPage}/>
            )}
        </div>
    )
}

export const MainPage = styled(MainContainer)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .post-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 20px 80px;
    }

    .no-posts-found {
        text-align: center;
        font-size: 18px;
        margin-top: 18px;
    }
`
