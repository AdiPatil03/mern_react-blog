import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import APIServices from '../common/services/api-service';
import ArticleThumbnail from './ArticleThumbnail';
import Banner from './Banner';

export default class Archive extends React.Component {
    constructor(props) {
        super(props);
        this.apiServices = new APIServices();
        this.archive = '';
        this.state = {
            articles: [],
            banner:   {}
        };
    }

    componentDidMount = () => {
        this._isMounted = true;
        this.archive = this.props.match.params.archive;
        if (!_.isUndefined(this.archive)) {
            this.apiServices.articlesByArchive(this.archive)
            .then(data => {
                if (this._isMounted) {
                    this.setState({
                        articles: data,
                        banner:   {
                            type:    'info',
                            message: `Viewing articles created in: ${this.archive}`
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
        if (this.archive !== this.props.match.params.archive) {
            this.archive = this.props.match.params.archive;
            if (!_.isUndefined(this.archive)) {
                this.apiServices.articlesByArchive(this.archive)
                .then(data => {
                    if (this._isMounted) {
                        this.setState({
                            articles: data,
                            banner:   {
                                type:    'info',
                                message: `Viewing articles created in: ${this.archive}`
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

Archive.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            archive: PropTypes.string
        }).isRequired
    }).isRequired,
    currentUser: PropTypes.string
};
