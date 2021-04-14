import React from 'react';
import PropTypes from 'prop-types';
import {Translation} from 'react-i18next';
import Error from './Error';
import PostService from '../common/services/post-service';

export default class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.postService = new PostService();
        const tags = props.tags.map(tag => {
            let obj;
            if (props.post && props.post.tags.includes(tag)) {
                obj = {name: tag, isChecked: true};
            } else {
                obj = {name: tag, isChecked: false};
            }
            return obj;
        });
        this.state = {
            title:    props.post ? props.post.title : '',
            body:     props.post ? props.post.body : '',
            tags:     tags,
            editMode: props.post,
            error:    ''
        };
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

    submit = event => {
        let tags = [];
        this.state.tags.forEach(tag => {
            if (tag.isChecked) {
                tags.push(tag.name);
            }
            return null;
        });
        let post = {
            title:  this.state.title,
            body:   this.state.body,
            author: this.props.currentUser,
            tags
        };

        if (this.state.editMode) {
            post.slug = this.props.post.slug;

            this.postService.update(post).then(() => {
                this.props.clearEditMode(post);
            }).catch(error => {
                this.setState({
                    error: error.message
                });
            });
        } else {
            this.postService.create(post).then(data => {
                this.props.history.push({
                    pathname: `/post/${data.slug}`
                });
            }).catch(error => {
                this.setState({
                    error: error.message
                });
            });
        }

        event.preventDefault();
    }

    render = () => {
        const translate = (word) => (<Translation>{(t, {i18n}) => t(word)}</Translation>);
        return (
            <>
                <Error error={this.state.error}/>
                <form style={{marginTop: '50px'}} onSubmit={this.submit} className="offset-md-1 col-md-10">
                    <div className="form-group row ">
                        <label className="col-sm-2 col-form-label">{translate('post.title')}:</label>
                        <input type="text" className="col-sm-10 form-control" value={this.state.title} onChange={this.handleTitleChange}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">{translate('post.body')}:</label>
                        <textarea
                            type="text"
                            rows="5"
                            className="form-control col-md-10"
                            value={this.state.body}
                            onChange={this.handleBodyChange}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">{translate('post.tags')}:</label>
                        <div className="form-group">
                            {this.state.tags && this.state.tags.map((tag, key) => (
                                <div key={key} className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        onChange={this.handleTagSelect.bind(this, key)}
                                        checked={tag.isChecked}
                                        value={tag.name}/>
                                    <label className="form-check-label">{tag.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary float-right">{translate('post.submit')}</button>
                </form>
            </>
        );
    }
}

PostForm.propTypes = {
    tags:          PropTypes.array.isRequired,
    currentUser:   PropTypes.string,
    clearEditMode: PropTypes.func,
    history:       PropTypes.shape({
        push: PropTypes.func
    }).isRequired,
    post: PropTypes.shape({
        tags:  PropTypes.array.isRequired,
        title: PropTypes.string,
        body:  PropTypes.string,
        slug:  PropTypes.string
    })
};
