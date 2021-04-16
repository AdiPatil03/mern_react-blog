import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PostService from '../common/services/post-service';
import PostThumbnail from './PostThumbnail';
import PostForm from './PostForm';
import Banner from './Banner';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.postService = new PostService();
        this.state = {
            editMode: false,
            post:     {},
            banner:   {}
        };
    }

    componentDidMount = () => {
        this._isMounted = true;
        const slug = this.props.match.params.slug;
        if (!_.isUndefined(slug)) {
            this.postService.find(slug).then(data => {
                this.setState({
                    post: data.post
                });
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

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render = () => (
        <>
            <Banner banner={this.state.banner} />
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
