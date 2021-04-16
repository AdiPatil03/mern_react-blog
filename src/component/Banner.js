import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Banner = ({banner}) => {
    if (_.isEmpty(banner)) {
        return null;
    }
    return (
        <div className={`alert alert-${banner.type}`} role="alert">
            {banner.message}
        </div>
    );
};

export default Banner;

Banner.propTypes = {
    banner: PropTypes.shape({
        type:    PropTypes.string,
        message: PropTypes.string
    }).isRequired
};
