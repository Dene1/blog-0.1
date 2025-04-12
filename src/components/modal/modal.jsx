import {Button} from "../button/button.jsx"
import {useSelector} from "react-redux"
import styled from "styled-components"
import {
    selectModalIsOpen,
    selectModalText,
    selectModalOnCancel,
    selectModalOnConfirm
} from "../../selectors/index.js"

const ModalContainer = ({className}) => {
    const isOpen = useSelector(selectModalIsOpen)
    const text = useSelector(selectModalText)
    const onConfirm = useSelector(selectModalOnConfirm)
    const onCancel = useSelector(selectModalOnCancel)

    if (!isOpen) {
        return null
    }

    return <div className={className}>
        <div className="overlay"></div>
        <div className="box">
            <h3>{text}</h3>
            <div className="buttons">
                <Button width="120px" onClick={onConfirm}>Да</Button>
                <Button width="120px" onClick={onCancel}>Отмена</Button>
            </div>
        </div>
    </div>
}

export const Modal = styled(ModalContainer)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;

    .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        background-color: white;
        margin: 0 auto;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    h3 {
        margin: 0 0 20px;
        text-align: center;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }
`
