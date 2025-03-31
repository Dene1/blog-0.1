import {Icon} from "../../../index.js"
import styled from "styled-components"
import {Link} from "react-router-dom"


const LargeText = styled.div`
    font-size: 48px;
    font-weight: 600;
    line-height: 48px;
    user-select: none;
`

const SmallText = styled.div`
    font-size: 18px;
    font-weight: bold;
    user-select: none;
`

const LogoContainer = ({className}) => (
    <Link to="/" className={className}>
        <Icon id="fa-code" size="70px" margin="0 6px 0 0"/>
        <div>
            <LargeText>Блог</LargeText>
            <SmallText>Веб-разработчика</SmallText>
        </div>
    </Link>
)

export const Logo = styled(LogoContainer)`
    display: flex;
    align-items: center;
`
