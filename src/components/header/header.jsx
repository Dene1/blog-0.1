import styled from "styled-components"
import {ControlPanel, Logo} from "./components"

const Discription = styled.div`
    font-style: italic;
`

const HeaderContainer = ({className}) => (
    <header className={className}>
        <Logo/>
        <Discription>
            Веб-технологии<br/>
            Написание кода<br/>
            Разбор ошибок
        </Discription>
        <ControlPanel/>
    </header>
)

export const Header = styled(HeaderContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 1000px;
    height: 120px;
    padding: 20px 40px;
    background-color: white;
    box-shadow: 0 -2px 17px black;
    z-index: 10;
`
