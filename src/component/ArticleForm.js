import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import APIServices from '../common/services/api-service';
import PropTypes from 'prop-types';

const ArticleForm = ({user, previousTags, clearEditMode, article, addTags, addArchives, setBanner}) => {
    const apiServices = new APIServices();
    const history = useHistory();
    const {t} = useTranslation();
    const [title, setTitle] = useState(article ? article.title : '');
    const [body, setBody] = useState(article ? article.body : '');
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        if (!user) {
            history.push({
                pathname: '/'
            });
        }
    }, [user]);

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
            author: user,
            tags:   tagsArr
        };

        if (article) {
            articleObj.slug = article.slug;

            apiServices.update(articleObj)
            .then(data => {
                articleObj.slug = data.slug;
                addTags(tagsArr);
                clearEditMode(articleObj);
            })
            .catch(error => setBanner({
                type:    'danger',
                message: t(`error.${error.message}`)
            }));

        } else {
            const date = new Date();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const archive = `${months[date.getMonth()]} ${date.getFullYear()}`;
            articleObj.createdAt = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
            articleObj.author = user;

            apiServices.create(articleObj)
            .then(data => {
                addArchives([archive]);
                addTags(tagsArr);
                history.push({
                    pathname: `/article/${data.slug}`
                });
            })
            .catch(error => setBanner({
                type:    'danger',
                message: t(`error.${error.message}`)
            }));
        }

        event.preventDefault();
    };

    return (
        <>
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
                    <input type="text" className="col-sm-3 form-control" value={newTag} onChange={e => setNewTag(e.target.value)}/>
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

const mapStateToProps = state => ({
    user:         state.user,
    previousTags: state.tags
});

const mapDispatchToProps = dispatch => ({
    addArchives: item => dispatch({type: 'ADD_ARCHIVES', item}),
    addTags:     item => dispatch({type: 'ADD_TAGS', item}),
    setBanner:   item => dispatch({type: 'SET_BANNER', item})
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);

ArticleForm.propTypes = {
    user:          PropTypes.string,
    previousTags:  PropTypes.array.isRequired,
    clearEditMode: PropTypes.func,
    addArchives:   PropTypes.func,
    addTags:       PropTypes.func,
    setBanner:     PropTypes.func,
    article:       PropTypes.shape({
        tags:  PropTypes.array.isRequired,
        title: PropTypes.string,
        body:  PropTypes.string,
        slug:  PropTypes.string
    })
};
