import {H2} from "../h2/h2.jsx"
import styled from "styled-components"

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Content = ({children, error}) =>
    error ? (
        <Div>
            <H2>Произошла ошибка</H2>
            <div>{error}</div>
        </Div>
    ) : (
        <>{children}</>
    )
