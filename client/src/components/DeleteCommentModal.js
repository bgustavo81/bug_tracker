import React from 'react';
import ReactDOM from 'react-dom';
import "../styles/DeleteModalStyles.css";

const DeleteModal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="DeleteModalContainer">
            <div onClick={(e) => e.stopPropagation()} className="DeleteModalContent">
                <h3>{props.title}</h3>
                <div>{props.content}</div>
                <div>{props.actions}</div>
            </div>
        </div>,
        document.getElementById('deleteCommentModal')
    );
}

export default DeleteModal;