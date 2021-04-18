import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import APIServices from '../common/services/api-service';
import ArticleThumbnail from './ArticleThumbnail';
import Banner from './Banner';

class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.apiServices = new APIServices();
        this.tag = '';
        this.state = {
            articles: [],
            banner:   {}
        };
    }

    componentDidMount = () => {
        this._isMounted = true;
        this.tag = this.props.match.params.tag;
        if (!_.isUndefined(this.tag)) {
            this.apiServices.articlesByTag(this.tag)
            .then(data => {
                if (this._isMounted) {
                    this.setState({
                        articles: data,
                        banner:   {
                            type:    'info',
                            message: `Viewing articles by tag: ${this.tag}`
                        }
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

    componentDidUpdate = () => {
        if (this.tag !== this.props.match.params.tag) {
            this.tag = this.props.match.params.tag;
            if (!_.isUndefined(this.tag)) {
                this.apiServices.articlesByTag(this.tag)
                .then(data => {
                    if (this._isMounted) {
                        this.setState({
                            articles: data,
                            banner:   {
                                type:    'info',
                                message: `Viewing articles by tag: ${this.tag}`
                            }
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
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render = () => (
        <>
            <Banner banner={this.state.banner}/>
            {this.state.articles && this.state.articles.map((article, key) =>
                <ArticleThumbnail key={key} article={article} currentUser={this.props.currentUser} thumbnail={false}></ArticleThumbnail>
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
