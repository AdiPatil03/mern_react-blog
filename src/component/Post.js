import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PostService from '../common/services/post-service';
import PostThumbnail from './PostThumbnail';
import PostForm from './PostForm';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.postService = new PostService();
        this.state = {
            editMode: false,
            post:     {
                tags: []
            }
        };
    }

    componentDidMount = () => {
        const slug = this.props.match.params.slug;
        if (!_.isUndefined(slug)) {
            this.postService.find(slug).then(data => {
                this.setState({
                    post: data.post
                });
            });
        }
    }

    setEditMode = event => {
        this.setState({
            editMode: true
        });
        event.preventDefault();
    }

    clearEditMode = post => {
        this.setState({
            editMode: false,
            post:     post
        });
    }

    render = () => (
        <>
            {this.state.editMode
                ? <PostForm post={this.state.post} tags={this.props.tags} clearEditMode={this.clearEditMode} {...this.props}/>
                : <PostThumbnail
                    post={this.state.post}
                    currentUser={this.props.currentUser}
                    setEdit={this.setEditMode}
                    {...this.props}
                    thumbnail={false}/>
            }
        </>
    );
}

Post.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            slug: PropTypes.string
        }).isRequired
    }).isRequired,
    tags:        PropTypes.array.isRequired,
    currentUser: PropTypes.string
};
