import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = ({user, tags, archives}) => {
    const {t} = useTranslation();

    return (
        <aside className="col-md-4 blog-sidebar">
            <p>{t('home.welcome')}, {user === '' ? t('home.guest') : user}</p>
            <div className="p-3 mb-3 bg-light rounded">
                <h4 className="font-italic">{t('home.tags')}</h4>
                <p className="mb-0">
                    {tags.map((tag, key) => (
                        <Link key={key} to={`/tags/${tag}`}>
                            <span className="badge badge-pill badge-info">{tag}</span>
                        </Link>
                    ))}
                </p>
            </div>

            <div className="p-3">
                <h4 className="font-italic">{t('home.archives')}</h4>
                <ol className="list-unstyled mb-0">
                    {archives.map((archive, key) => (
                        <li key={key}>
                            <Link to={`/archives/${archive}`}>{archive}</Link>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="p-3">
                <h4 className="font-italic">{t('home.about-me')}</h4>
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
    tags:     PropTypes.array,
    archives: PropTypes.array,
    user:     PropTypes.string
};
