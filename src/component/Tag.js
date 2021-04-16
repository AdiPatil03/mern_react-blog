import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PostService from '../common/services/post-service';
import PostThumbnail from './PostThumbnail';
import Banner from './Banner';

class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.postService = new PostService();
        this.tag = '';
        this.state = {
            posts:  [],
            banner: {}
        };
    }

    componentDidMount = () => {
        this._isMounted = true;
        this.tag = this.props.match.params.tag;
        if (!_.isUndefined(this.tag)) {
            this.postService.postsByTag(this.tag).then(data => {
                if (this._isMounted) {
                    this.setState({
                        posts:  data.posts,
                        banner: {
                            type:    'info',
                            message: `Viewing post by tag: ${this.tag}`
                        }
                    });
                }
            }).catch(error => {
                if (this._isMounted) {
                    this.setState({
                        banner: {
                            type:    'danger',
                            message: error.message
                        }
                    });
                }
            });
        }
    }

    componentDidUpdate = () => {
        if (this.tag !== this.props.match.params.tag) {
            this.tag = this.props.match.params.tag;
            if (!_.isUndefined(this.tag)) {
                this.postService.postsByTag(this.tag).then(data => {
                    if (this._isMounted) {
                        this.setState({
                            posts:  data.posts,
                            banner: {
                                type:    'info',
                                message: `Viewing post by tag: ${this.tag}`
                            }
                        });
                    }
                }).catch(error => {
                    if (this._isMounted) {
                        this.setState({
                            banner: {
                                type:    'danger',
                                message: error.message
                            }
                        });
                    }
                });
            }
        }
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render = () => (
        <>
            <Banner banner={this.state.banner}/>
            {this.state.posts && this.state.posts.map((post, key) =>
                <PostThumbnail key={key} post={post} currentUser={this.props.currentUser} thumbnail={false}></PostThumbnail>
            )}
        </>
    );
}

Tag.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            tag: PropTypes.string
        }).isRequired,
    }).isRequired,
    currentUser: PropTypes.string
};

export default Tag;
