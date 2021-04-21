import React, {useState, useEffect, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import APIServices from '../common/services/api-service';
import PropTypes from 'prop-types';
import Banner from './Banner';
import UserContext from './UserContext';

const ArticleForm = ({previousTags, clearEditMode, history, article}) => {
    const apiServices = new APIServices();
    const currentUser = useContext(UserContext);
    const {t} = useTranslation();
    const [title, setTitle] = useState(article ? article.title : '');
    const [body, setBody] = useState(article ? article.body : '');
    const [banner, setBanner] = useState({});
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        if (!currentUser) {
            history.push({
                pathname: '/'
            });
        }
    }, [currentUser]);

    useEffect(() => {
        if (previousTags.length > 0) {
            setTags(previousTags.map(tag => {
                let obj;
                if (article && article.tags.includes(tag)) {
                    obj = {name: tag, isChecked: true};
                } else {
                    obj = {name: tag, isChecked: false};
                }
                return obj;
            }));
        }
    }, [previousTags]);

    const handleTagSelect = index => {
        tags[index].isChecked = !tags[index].isChecked;
        setTags([...tags]);
    };

    const handleAddNewTagClick = () => {
        setTags(tags.concat({name: newTag, isChecked: true}));
        setNewTag('');
    };

    const submit = event => {
        let tagsArr = [];
        tags.forEach(tag => {
            if (tag.isChecked) {
                tagsArr.push(tag.name.trim());
            }
            return null;
        });
        let articleObj = {
            title:  title.trim(),
            body:   body,
            author: currentUser,
            tags:   tagsArr
        };

        if (article) {
            articleObj.slug = article.slug;

            apiServices.update(articleObj)
            .then(data => {
                articleObj.slug = data.slug;
                clearEditMode(articleObj);
            })
            .catch(error => setBanner({
                type:    'danger',
                message: error.message
            }));

        } else {
            const date = new Date();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            articleObj.createdAt = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
            articleObj.author = currentUser;

            apiServices.create(articleObj)
            .then(data => {
                history.push({
                    pathname: `/article/${data.slug}`
                });
            })
            .catch(error => setBanner({
                type:    'danger',
                message: error.message
            }));
        }

        event.preventDefault();
    };

    return (
        <>
            <Banner banner={banner}/>
            <form style={{marginTop: '50px'}} onSubmit={submit}>
                <div className="form-group row ">
                    <label className="col-sm-3 col-form-label">{t('article.title')}:</label>
                    <input type="text" className="col-sm-9 form-control" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">{t('article.body')}:</label>
                    <textarea
                        type="text"
                        rows="5"
                        className="form-control col-md-9"
                        value={body}
                        onChange={e => setBody(e.target.value)}/>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">{t('article.tags')}:</label>
                    <div className="form-group">
                        {tags.length > 0
                            ? tags.map((tag, key) => (
                                <div key={key} className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        onChange={() => handleTagSelect(key)}
                                        checked={tag.isChecked}
                                        value={tag.name}/>
                                    <label className="form-check-label">{tag.name}</label>
                                </div>
                            ))
                            : <span> Please add Tag </span>
                        }
                    </div>
                </div>
                <div className="form-group row offset-md-3">
                    <input type="text" className="col-sm-3 form-control" value={newTag} onChange={e => setNewTag(e.target.value.trim())}/>
                    <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => handleAddNewTagClick()}>
                        {t('article.add-new-tag')} +
                    </button>
                </div>
                <button type="submit" className="btn btn-primary float-right">{t('article.submit')}</button>
            </form>
        </>
    );
};

export default ArticleForm;

ArticleForm.propTypes = {
    previousTags:  PropTypes.array.isRequired,
    clearEditMode: PropTypes.func,
    history:       PropTypes.shape({
        push: PropTypes.func
    }).isRequired,
    article: PropTypes.shape({
        tags:  PropTypes.array.isRequired,
        title: PropTypes.string,
        body:  PropTypes.string,
        slug:  PropTypes.string
    })
};
