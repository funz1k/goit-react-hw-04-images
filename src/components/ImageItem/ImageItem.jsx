import { PropTypes } from "prop-types";
import { ImageGalleryItem, ImageGalleryItemImage } from "./ImageItem.styled";

const ImageItem = ({ webformatURL, onClick, value }) => (
    <ImageGalleryItem onClick={onClick}>
        <ImageGalleryItemImage
            src={webformatURL}
            alt={value}
        />
    </ImageGalleryItem>
)

ImageItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default ImageItem