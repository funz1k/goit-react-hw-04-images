import axios from "axios";

const ENDPOINT = "https://pixabay.com/api/";
const MY_KEY = "27788557-ef284ffc5471aee7171defc77";
const per_page = 12;

const SearchApi = ({ value, page }) => {
    return axios
        .get(
            `${ENDPOINT}?q=${value}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
        )
        .then((response) => response.data)
        .catch((error) => new Error(error));
}

export default SearchApi;

