// import React, {useState, useEffect, useContext, useReducer} from 'react';
import React, {useEffect, useContext, useReducer} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import APIServices from '../common/services/api-service';
import UserContext from './UserContext';
import {initialStore, reducer} from './SidebarReducer';

const Sidebar = ({setHomeTags}) => {
    const apiServices = new APIServices();
    const currentUser = useContext(UserContext);
    const [state, dispatch] = useReducer(reducer, initialStore);
    const {t} = useTranslation();
    // const [tags, setTags] = useState([]);
    // const [archives, setArchives] = useState([]);

    useEffect(() => {
        apiServices.allArticlesPreviews()
        .then(response => {
            // setTags(response.tags);
            dispatch({type: 'ADD_TAGS', item: response.tags});
            setHomeTags(response.tags);
            // setArchives(response.archives);
            dispatch({type: 'ADD_ARCHIVES', item: response.archives});
        });
    }, []);

    return (
        <aside className="col-md-4 blog-sidebar">
            <p>{t('home.welcome')}, {currentUser === '' ? t('home.guest') : currentUser}</p>
            <div className="p-3 mb-3 bg-light rounded">
                <h4 className="font-italic">{t('home.tags')}</h4>
                <p className="mb-0">
                    {state.tags.map((tag, key) => (
                        <Link key={key} to={`/tags/${tag}`}>
                            <span className="badge badge-pill badge-info">{tag}</span>
                        </Link>
                    ))}
                </p>
            </div>

            <div className="p-3">
                <h4 className="font-italic">{t('home.archives')}</h4>
                <ol className="list-unstyled mb-0">
                    {state.archives.map((archive, key) => (
                        <li key={key}>
                            <Link to={`/archives/${archive}`}>{archive}</Link>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="p-3">
                <h4 className="font-italic">{t('home.elsewhere')}</h4>
                <ol className="list-unstyled">
                    <li><a href="https://github.com/AdiPatil03" target="blank">GitHub</a></li>
                    <li><a href="https://www.linkedin.com/in/adityapatil3" target="blank">Linkedin</a></li>
                </ol>
            </div>
        </aside>
    );
};

export default Sidebar;

Sidebar.propTypes = {
    setHomeTags: PropTypes.func
};
