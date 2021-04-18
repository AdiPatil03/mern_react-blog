import React from 'react';
import PropTypes from 'prop-types';
import {Translation} from 'react-i18next';
import _ from 'lodash';
import Banner from './Banner';
import APIServices from '../common/services/api-service';

export default class ArticleForm extends React.Component {
    constructor(props) {
        super(props);
        this.apiServices = new APIServices();
        const tags = props.tags.map(tag => {
            let obj;
            if (props.article && props.article.tags.includes(tag)) {
                obj = {name: tag, isChecked: true};
            } else {
                obj = {name: tag, isChecked: false};
            }
            return obj;
        });
        this.state = {
            title:    props.article ? props.article.title : '',
            body:     props.article ? props.article.body : '',
            tags:     tags,
            newTag:   '',
            editMode: props.article,
            banner:   {}
        };
    }

    componentDidMount = () => {
        if (_.isEmpty(this.props.currentUser)) {
            this.props.history.push({
                pathname: '/'
            });
        }
    }

    handleTitleChange = event => {
        this.setState({
            title: event.target.value
        });
    }

    handleBodyChange = event => {
        this.setState({
            body: event.target.value
        });
    }

    handleTagSelect = index => {
        const {tags} = this.state;
        tags[index].isChecked = !tags[index].isChecked;
        this.setState({
            tags: tags
        });
    }

    handleAddNewTagChange = event => {
        this.setState({
            newTag: event.target.value
        });
    }

    handleAddNewTagClick = () => {
        if (!_.isEmpty(this.state.newTag)) {
            this.setState(prevState => ({
                tags:   prevState.tags.concat({name: prevState.newTag, isChecked: true}),
                newTag: ''
            }));
        }
    }

    submit = event => {
        let tags = [];
        this.state.tags.forEach(tag => {
            if (tag.isChecked) {
                tags.push(tag.name);
            }
            return null;
        });
        let article = {
            title:  this.state.title,
            body:   this.state.body,
            author: this.props.currentUser,
            tags
        };

        if (this.state.editMode) {
            article.slug = this.props.article.slug;

            this.apiServices.update(article)
            .then(data => {
                article.slug = data.slug;
                this.props.clearEditMode(article);
            })
            .catch(error => {
                this.setState({
                    banner: {
                        type:    'danger',
                        message: error.message
                    }
                });
            });

        } else {
            article.createdAt = new Date();
            article.author = this.props.currentUser;

            this.apiServices.create(article)
            .then(data => {
                this.props.history.push({
                    pathname: `/article/${data.slug}`
                });
            })
            .catch(error => {
                this.setState({
                    banner: {
                        type:    'danger',
                        message: error.message
                    }
                });
            });
        }

        event.preventDefault();
    }

    render = () => {
        const translate = (word) => (<Translation>{(t, {i18n}) => t(word)}</Translation>);
        return (
            <>
                <Banner banner={this.state.banner}/>
                <form style={{marginTop: '50px'}} onSubmit={this.submit}>
                    <div className="form-group row ">
                        <label className="col-sm-3 col-form-label">{translate('article.title')}:</label>
                        <input type="text" className="col-sm-9 form-control" value={this.state.title} onChange={this.handleTitleChange}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">{translate('article.body')}:</label>
                        <textarea
                            type="text"
                            rows="5"
                            className="form-control col-md-9"
                            value={this.state.body}
                            onChange={this.handleBodyChange}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">{translate('article.tags')}:</label>
                        <div className="form-group">
                            {this.state.tags && this.state.tags.length > 0
                                ? this.state.tags.map((tag, key) => (
                                    <div key={key} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            onChange={this.handleTagSelect.bind(this, key)}
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
                        <input type="text" className="col-sm-3 form-control" value={this.state.newTag} onChange={this.handleAddNewTagChange}/>
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={this.handleAddNewTagClick}>
                            {translate('article.add-new-tag')} +
                        </button>
                    </div>
                    <button type="submit" className="btn btn-primary float-right">{translate('article.submit')}</button>
                </form>
            </>
        );
    }
}

ArticleForm.propTypes = {
    tags:          PropTypes.array.isRequired,
    currentUser:   PropTypes.string,
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
