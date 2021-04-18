import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import APIServices from '../common/services/api-service';
import ArticleThumbnail from './ArticleThumbnail';
import ArticleForm from './ArticleForm';
import Banner from './Banner';

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.apiServices = new APIServices();
        this.state = {
            editMode: false,
            article:  {},
            banner:   {}
        };
    }

    componentDidMount = () => {
        this._isMounted = true;
        const slug = this.props.match.params.slug;

        if (!_.isUndefined(slug)) {

            this.apiServices.find(slug)
            .then(data => {
                if (this._isMounted) {
                    this.setState({
                        article: data
                    });
                }
            })
            .catch(error => {
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

    clearEditMode = article => {
        this.setState({
            editMode: false,
            article:  article
        });
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render = () => (
        <>
            <Banner banner={this.state.banner} />
            {this.state.editMode
                ? <ArticleForm article={this.state.article} tags={this.props.tags} clearEditMode={this.clearEditMode} {...this.props}/>
                : <ArticleThumbnail
                    article={this.state.article}
                    currentUser={this.props.currentUser}
                    setEdit={this.setEditMode}
                    {...this.props}
                    thumbnail={false}/>
            }
        </>
    );
}

Article.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            slug: PropTypes.string
        }).isRequired
    }).isRequired,
    tags:        PropTypes.array.isRequired,
    currentUser: PropTypes.string
};
