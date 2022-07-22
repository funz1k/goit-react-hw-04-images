import PropTypes from "prop-types";
import React, { Component } from "react";
import { Overlay, Modal } from "./Modal.styled";


class ModalLargeImg extends Component {
    componentDidMount() {
        window.addEventListener("keydown", this.props.onClose);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.props.onClose);
    }

    render() {
        const { onClose, children } = this.props;
        return (
            <Overlay onClick={onClose}>
                <Modal>
                    <img src={children} alt="" width={800} height={600} />
                </Modal>
            </Overlay>
        );
    }
}

export default ModalLargeImg;

ModalLargeImg.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

