import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import APIServices from '../common/services/api-service';
import ArticleThumbnail from './ArticleThumbnail';

const Archive = ({user, setBanner, page, resetPage, oldPage, newPage}) => {
    const apiServices = new APIServices();
    const {t} = useTranslation();
    const {archive} = useParams();
    const [articles, setArticles] = useState([]);
    const filteredArticles = articles.slice(page * 4, (page * 4) + 4);

    useEffect(() => {
        apiServices.articlesByArchive(archive)
        .then(data => {
            setArticles(data);
            resetPage();
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
            {filteredArticles.map((article, key) =>
                <ArticleThumbnail key={key} article={article} user={user} thumbnail={true}></ArticleThumbnail>
            )}
            <nav className="blog-pagination float-right">
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    disabled={page === 0}
                    onClick={() => oldPage()}>
                    Older Articles
                </button>
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    disabled={page >= Math.ceil(articles.length / 4) - 1}
                    onClick={() => newPage()}>
                    Newer Articles
                </button>
            </nav>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.user,
    page: state.page
});

const mapDispatchToProps = dispatch => ({
    setBanner: item => dispatch({type: 'SET_BANNER', item}),
    resetPage: () => dispatch({type: 'RESET_PAGE'}),
    newPage:   () => dispatch({type: 'NEW_PAGE'}),
    oldPage:   () => dispatch({type: 'OLD_PAGE'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Archive);

Archive.propTypes = {
    user:      PropTypes.string,
    setBanner: PropTypes.func,
    page:      PropTypes.number,
    resetPage: PropTypes.func,
    newPage:   PropTypes.func,
    oldPage:   PropTypes.func
};
