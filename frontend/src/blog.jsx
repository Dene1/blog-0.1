import {Route, Routes} from "react-router-dom"
import {Header, Footer, Modal, Error} from "./components/index.js"
import {Authorization, MainPage, Post, Registration, Users} from "./pages/index.js"
import {useLayoutEffect} from "react"
import {useDispatch} from "react-redux"
import {setUser} from "./actions/index.js"
import styled from "styled-components"
import {ERROR} from "./constants/index.js"

const AppColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
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
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<Authorization/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/post" element={<Post/>}/>
                    <Route path="/post/:id" element={<Post/>}/>
                    <Route path="/post/:id/edit" element={<Post/>}/>
                    <Route path="*"
                           element={<Error error={ERROR.PAGE_NOT_EXIST}/>}/>
                </Routes>
            </Page>
            <Footer/>
            <Modal/>
        </AppColumn>
    )
}
