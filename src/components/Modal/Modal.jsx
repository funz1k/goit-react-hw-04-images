import PropTypes from "prop-types";
import { useEffect } from "react";
import { Overlay, Modal } from "./Modal.styled";


const ModalLargeImg = ({ onClose, children }) => {

    useEffect(() => {
        document.addEventListener("keydown", onClose);

        return () => {
            document.removeEventListener("keydown", onClose);
        }
    }, [onClose])

    return (
        <Overlay onClick={onClose}>
            <Modal>
                <img src={children} alt="" width={800} height={600} />
            </Modal>
        </Overlay>
    );
}

export default ModalLargeImg;

ModalLargeImg.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

