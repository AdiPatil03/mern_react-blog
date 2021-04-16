import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PostService from '../common/services/post-service';
import PostThumbnail from './PostThumbnail';
import Banner from './Banner';

export default class Archive extends React.Component {
    constructor(props) {
        super(props);
        this.postService = new PostService();
        this.archive = '';
        this.state = {
            posts:  [],
            banner: {}
        };
    }

    componentDidMount = () => {
        this._isMounted = true;
        this.archive = this.props.match.params.archive;
        if (!_.isUndefined(this.archive)) {
            this.postService.postsByArchive(this.archive).then(data => {
                if (this._isMounted) {
                    this.setState({
                        posts:  data.posts,
                        banner: {
                            type:    'info',
                            message: `Viewing post created in: ${this.archive}`
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
        if (this.archive !== this.props.match.params.archive) {
            this.archive = this.props.match.params.archive;
            if (!_.isUndefined(this.archive)) {
                this.postService.postsByArchive(this.archive).then(data => {
                    if (this._isMounted) {
                        this.setState({
                            posts:  data.posts,
                            banner: {
                                type:    'info',
                                message: `Viewing post created in: ${this.archive}`
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

Archive.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            archive: PropTypes.string
        }).isRequired
    }).isRequired,
    currentUser: PropTypes.string
};
