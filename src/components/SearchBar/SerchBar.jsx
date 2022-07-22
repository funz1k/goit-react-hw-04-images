import { PropTypes } from "prop-types";
import { Component } from "react";
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