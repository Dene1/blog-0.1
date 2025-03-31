import styled from "styled-components"
import {Route, Routes} from "react-router-dom"
import {Header} from "./components/index.js"

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
    const H2 = styled.h2`
        text-align: center;
    `

    const Footer = () => <div>Футер</div>

    return (
        <AppColumn>
            <Header/>
            <Content className="container">
                <H2>Контент страницы</H2>
                <Routes>
                    <Route path="/" element={<div>Главная страница</div>}/>
                    <Route path="/login" element={<div>Авторизация</div>}/>
                    <Route path="/register" element={<div>Регистрация</div>}/>
                    <Route path="/users" element={<div>Пользователи</div>}/>
                    <Route path="/post/:postId" element={<div>Статьи</div>}/>
                    <Route path="*" element={<div>Ошибка</div>}/>
                </Routes>
            </Content>
            <Footer/>
        </AppColumn>
    )
}
