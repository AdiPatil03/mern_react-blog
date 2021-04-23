import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import APIServices from '../common/services/api-service';
import ArticleThumbnail from './ArticleThumbnail';
import ArticleForm from './ArticleForm';

const Article = ({user, setBanner}) => {
    const apiServices = new APIServices();
    const {t} = useTranslation();
    const {slug} = useParams();
    const [editMode, setEditMode] = useState(false);
    const [article, setArticle] = useState({});

    useEffect(() => {
        apiServices.find(slug)
        .then(data => setArticle(data))
        .catch(error => setBanner({
            type:    'danger',
            message: t(`error.${error.message}`)
        }));
    }, [slug]);

    const clearEditMode = articleObj => {
        setEditMode(false);
        setArticle(articleObj);
    };

    return (
        <>
            {editMode
                ? <ArticleForm article={article} clearEditMode={clearEditMode}/>
                : <ArticleThumbnail
                    article={article}
                    user={user}
                    setEdit={() => setEditMode(true)}
                    thumbnail={false}/>
            }
        </>
    );
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    setBanner: item => dispatch({type: 'SET_BANNER', item})
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);

Article.propTypes = {
    user:      PropTypes.string,
    setBanner: PropTypes.func
};
