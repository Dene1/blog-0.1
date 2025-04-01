import styled from "styled-components"
import {Route, Routes} from "react-router-dom"
import {Header, Footer} from "./components"
import {Authorization, Registration} from "./pages"

export const Blog = () => {

    const AppColumn = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 1000px;
        min-height: 100%;
        margin: 0 auto;
        background-color: white;
    `

    const Content = styled.div`
        padding: 120px 0;
    `

    return (
        <AppColumn>
            <Header/>
            <Content className="container">
                <Routes>
                    <Route path="/" element={<div>Главная страница</div>}/>
                    <Route path="/login" element={<Authorization/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/users" element={<div>Пользователи</div>}/>
                    <Route path="/post/:postId" element={<div>Статьи</div>}/>
                    <Route path="*" element={<div>Ошибка</div>}/>
                </Routes>
            </Content>
            <Footer/>
        </AppColumn>
    )
}
