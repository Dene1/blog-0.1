import {H2} from "../h2/h2.jsx"
import styled from "styled-components"
import {PROP_TYPE} from "../../constants/index.js"

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Error = ({error}) =>
    error && (
        <Div>
            <H2>Произошла ошибка</H2>
            <div>{error}</div>
        </Div>
    )

Error.PropTypes = {
    error: PROP_TYPE.ERROR,
}
