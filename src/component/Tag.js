import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import APIServices from '../common/services/api-service';
import ArticleThumbnail from './ArticleThumbnail';

const Tag = ({user, setBanner}) => {
    const apiServices = new APIServices();
    const {t} = useTranslation();
    const {tag} = useParams();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        apiServices.articlesByTag(tag)
        .then(data => {
            setArticles(data);
            setBanner({
                type:    'info',
                message: `${t('info.tag-view')}: ${tag}`
            });
        })
        .catch(error => setBanner({
            type:    'danger',
            message: t(`error.${error.message}`)
        }));
    }, [tag]);

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

export default connect(mapStateToProps, mapDispatchToProps)(Tag);

Tag.propTypes = {
    user:      PropTypes.string,
    setBanner: PropTypes.func
};
