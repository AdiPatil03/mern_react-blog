import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PostService from '../common/services/post-service';
import PostThumbnail from './PostThumbnail';

class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.postService = new PostService();
        this.tag = '';
        this.state = {
            posts: []
        };
    }

    componentDidMount = () => {
        this.tag = this.props.match.params.tag;
        if (!_.isUndefined(this.tag)) {
            this.postService.postsByTag(this.tag).then(data =>
                this.setState({
                    posts: data.posts
                })
            );
        }
    }

    componentDidUpdate = () => {
        if (this.tag !== this.props.match.params.tag) {
            this.tag = this.props.match.params.tag;
            if (!_.isUndefined(this.tag)) {
                this.postService.postsByTag(this.tag).then(data =>
                    this.setState({
                        posts: data.posts
                    })
                );
            }
        }
    }

    render = () => (
        <>
            {this.state.posts && this.state.posts.map((post, key) =>
                <PostThumbnail key={key} post={post} currentUser={this.props.currentUser} thumbnail={false}></PostThumbnail>
            )}
        </>
    );
}

Tag.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            tag: PropTypes.node,
        }).isRequired,
    }).isRequired,
    currentUser: PropTypes.string
};

export default Tag;
