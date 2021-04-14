import React from 'react';
import PropTypes from 'prop-types';

const Error = ({error}) => {
    if (error === '') {
        return null;
    }
    return (
        <div className="alert alert-danger" role="alert">
            {error}
        </div>
    );
};

export default Error;

Error.propTypes = {
    error: PropTypes.string
};
