import { PropTypes } from "prop-types";
import { useState } from "react";
import { toast } from 'react-toastify';
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";
import { Header, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./SearchBar.styled";

const SearchBar = ({ onSubmit }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchValue = e => {
        const { value } = e.currentTarget;

        setSearchValue(value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (searchValue.trim() === '') {
            toast.error("Please enter something!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return
        }

        onSubmit(searchValue);
        resetInput();
    }

    const resetInput = () => {
        setSearchValue('');
    }

    return (
        <Header>
            <SearchForm onSubmit={handleSubmit}>
                <SearchFormButton type="submit">
                    <IconContext.Provider value={{ color: "blue", verticalAlign: 'middle' }}>
                        <FaSearch />
                    </IconContext.Provider>
                    <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                </SearchFormButton>

                <SearchFormInput
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={searchValue}
                    onChange={handleSearchValue}
                />
            </SearchForm>
        </Header>
    )
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;