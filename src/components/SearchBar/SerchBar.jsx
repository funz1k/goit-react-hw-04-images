import React from 'react';
import { PropTypes } from "prop-types";
import { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";
import { Header, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./SearchBar.styled";

class SearchBar extends Component {
    state = {
        searchValue: '',
    }

    handleChageSearchValue = e => {
        const { value } = e.currentTarget;

        this.setState({ searchValue: value })
    }

    handleSubmit = e => {
        const { searchValue } = this.state
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
        this.props.onSubmit(searchValue)
        this.resetInput();
    }

    resetInput = () => {
        this.setState({ searchValue: '' })
    }
    render() {

        return (
            <Header>
                <SearchForm onSubmit={this.handleSubmit}>
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
                        value={(this.state.searchValue)}
                        onChange={this.handleChageSearchValue}
                    />
                </SearchForm>
            </Header>
        )
    }
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;