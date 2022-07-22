import { BoxLoaderFirst, BoxLoaderSecond, LoaderStyled } from './Loader.styled'

const Loader = () => {
    return (
        <BoxLoaderFirst>
            <BoxLoaderSecond>
                <LoaderStyled data-text="Loading...">
                    Loading...
                </LoaderStyled>
            </BoxLoaderSecond>
        </BoxLoaderFirst>
    );
}

export default Loader;