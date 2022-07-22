import ImageItem from "components/ImageItem/ImageItem";
import { ImageGallery } from "./ImageList.styled";

const ImageList = ({ images, largeImage, value }) => (
    <ImageGallery>
        {
            images.map(({ id, webformatURL, largeImageURL }) => {
                const handleItemClick = () => largeImage(largeImageURL);
                return (
                    <ImageItem
                        key={id}
                        webformatURL={webformatURL}
                        onClick={handleItemClick}
                        value={value}
                    />
                )
            })
        }
    </ImageGallery>
)

export default ImageList;