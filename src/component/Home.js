import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import APIServices from '../common/services/api-service';
import ArticleThumbnail from './ArticleThumbnail';
import Banner from './Banner';
import UserContext from './UserContext';

const Home = () => {
    const apiServices = new APIServices();
    const currentUser = useContext(UserContext);
    const [articles, setArticles] = useState([]);
    const [banner, setBanner] = useState({});

    useEffect(() => {
        apiServices.allArticlesPreviews()
        .then(response => setArticles(response.previews))
        .catch(error => setBanner({type: 'danger', message: error.message}));
    }, []);

    return (
        <>
            <Banner banner={banner}/>
            {articles.map((article, key) =>
                <ArticleThumbnail key={key} article={article} thumbnail={true} currentUser={currentUser}></ArticleThumbnail>
            )}
        </>
    );
};

export default Home;

Home.propTypes = {
    setTagsAndArchives: PropTypes.func
};
