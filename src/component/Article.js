import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import APIServices from '../common/services/api-service';
import ArticleThumbnail from './ArticleThumbnail';
import ArticleForm from './ArticleForm';
import Banner from './Banner';
import UserContext from './UserContext';

const Article = ({match, tags, history}) => {
    const apiServices = new APIServices();
    const currentUser = useContext(UserContext);
    const slug = match.params.slug;
    const [editMode, setEditMode] = useState(false);
    const [article, setArticle] = useState({});
    const [banner, setBanner] = useState({});

    useEffect(() => {
        apiServices.find(slug)
        .then(data => setArticle(data))
        .catch(error => setBanner({
            type:    'danger',
            message: error.message
        }));
    }, [slug]);

    const clearEditMode = newArticle => {
        setEditMode(false);
        setArticle(newArticle);
    };

    return (
        <>
            <Banner banner={banner} />
            {editMode
                ? <ArticleForm article={article} previousTags={tags} clearEditMode={clearEditMode} history={history}/>
                : <ArticleThumbnail
                    article={article}
                    currentUser={currentUser}
                    setEdit={() => setEditMode(true)}
                    thumbnail={false}/>
            }
        </>
    );
};

export default Article;

Article.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            slug: PropTypes.string
        }).isRequired
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired,
    tags: PropTypes.array.isRequired
};
