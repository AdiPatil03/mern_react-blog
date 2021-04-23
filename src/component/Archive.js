import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import APIServices from '../common/services/api-service';
import ArticleThumbnail from './ArticleThumbnail';

const Archive = ({user, setBanner}) => {
    const apiServices = new APIServices();
    const {t} = useTranslation();
    const {archive} = useParams();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        apiServices.articlesByArchive(archive)
        .then(data => {
            setArticles(data);
            setBanner({
                type:    'info',
                message: `${t('info.archive-view')}: ${archive}`
            });
        })
        .catch(error => setBanner({
            type:    'danger',
            message: t(`error.${error.message}`)
        }));
    }, [archive]);

    return (
        <>
            {articles.map((article, key) =>
                <ArticleThumbnail key={key} article={article} user={user} thumbnail={true}></ArticleThumbnail>
            )}
        </>
    );
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    setBanner: item => dispatch({type: 'SET_BANNER', item})
});

export default connect(mapStateToProps, mapDispatchToProps)(Archive);

Archive.propTypes = {
    user:      PropTypes.string,
    setBanner: PropTypes.func
};
