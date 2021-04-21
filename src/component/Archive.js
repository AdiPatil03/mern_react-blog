import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import APIServices from '../common/services/api-service';
import ArticleThumbnail from './ArticleThumbnail';
import Banner from './Banner';
import UserContext from './UserContext';

const Archive = ({match}) => {
    const apiServices = new APIServices();
    const currentUser = useContext(UserContext);
    const archive = match.params.archive;
    const [articles, setArticles] = useState([]);
    const [banner, setBanner] = useState({});

    useEffect(() => {
        apiServices.articlesByArchive(archive)
        .then(data => {
            setArticles(data);
            setBanner({
                type:    'info',
                message: `Viewing articles created in: ${archive}`
            });
        })
        .catch(error => setBanner({
            type:    'danger',
            message: error.message
        }));
    }, [archive]);

    return (
        <>
            <Banner banner={banner}/>
            {articles.map((article, key) =>
                <ArticleThumbnail key={key} article={article} currentUser={currentUser} thumbnail={true}></ArticleThumbnail>
            )}
        </>
    );
};

export default Archive;

Archive.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            archive: PropTypes.string
        }).isRequired
    }).isRequired
};
