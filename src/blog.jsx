import {Route, Routes} from "react-router-dom"
import {Header, Footer, Modal} from "./components"
import {Authorization, Post, Registration, Users} from "./pages"
import {useLayoutEffect} from "react"
import {useDispatch} from "react-redux"
import {setUser} from "./actions/index.js"
import styled from "styled-components"

const AppColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1000px;
    min-height: 100%;
    margin: 0 auto;
    background-color: white;
`

const Page = styled.div`
    padding: 110px 0 20px;
`

export const Blog = () => {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        const currentUserDataJSON = sessionStorage.getItem("userData")

        if (!currentUserDataJSON) {
            return
        }

        const currentUserData = JSON.parse(currentUserDataJSON)

        dispatch(setUser({...currentUserData, roleId: Number(currentUserData.roleId)}))
    }, [dispatch])

    return (
        <AppColumn>
            <Header/>
            <Page>
                <Routes>
                    <Route path="/" element={<div>Главная страница</div>}/>
                    <Route path="/login" element={<Authorization/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/post" element={<div>Новая статей</div>}/>
                    <Route path="/post/:id" element={<Post/>}/>
                    <Route path="/post/:id/edit" element={<Post/>}/>
                    <Route path="*" element={<div>Ошибка</div>}/>
                </Routes>
            </Page>
            <Footer/>
            <Modal/>
        </AppColumn>
    )
}
