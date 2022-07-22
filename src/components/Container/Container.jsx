import PropTypes from 'prop-types'
import { Section } from './Container.styled';

const Container = ({ children }) => (
    <Section>
        {children}
    </Section>
);

Container.propTypes = {
    children: PropTypes.node,
}

export default Container