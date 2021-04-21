import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import APIServices from '../common/services/api-service';
import ArticleThumbnail from './ArticleThumbnail';
import Banner from './Banner';
import UserContext from './UserContext';

const Tag = ({match}) => {
    const apiServices = new APIServices();
    const currentUser = useContext(UserContext);
    const tag = match.params.tag;
    const [articles, setArticles] = useState([]);
    const [banner, setBanner] = useState({});

    useEffect(() => {
        apiServices.articlesByTag(tag)
        .then(data => {
            setArticles(data);
            setBanner({
                type:    'info',
                message: `Viewing articles by tag: ${tag}`
            });
        })
        .catch(error => setBanner({
            type:    'danger',
            message: error.message
        }));
    }, [tag]);

    return (
        <>
            <Banner banner={banner}/>
            {articles.map((article, key) =>
                <ArticleThumbnail key={key} article={article} currentUser={currentUser} thumbnail={true}></ArticleThumbnail>
            )}
        </>
    );
};

export default Tag;

Tag.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            tag: PropTypes.string
        }).isRequired,
    }).isRequired,
    currentUser: PropTypes.string
};
