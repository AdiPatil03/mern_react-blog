import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PostService from '../common/services/post-service';
import PostThumbnail from './PostThumbnail';

export default class Archive extends React.Component {
    constructor(props) {
        super(props);
        this.postService = new PostService();
        this.archive = '';
        this.state = {
            posts: []
        };
    }

    componentDidMount = () => {
        this.archive = this.props.match.params.archive;
        if (!_.isUndefined(this.archive)) {
            this.postService.postsByArchive(this.archive).then(data => {
                this.setState({
                    posts: data.posts
                });
            });
        }
    }

    componentDidUpdate = () => {
        if (this.archive !== this.props.match.params.archive) {
            this.archive = this.props.match.params.archive;
            if (!_.isUndefined(this.archive)) {
                this.postService.postsByArchive(this.archive).then(data => {
                    this.setState({
                        posts: data.posts
                    });
                });
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

Archive.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            archive: PropTypes.string
        }).isRequired
    }).isRequired,
    currentUser: PropTypes.string
};
