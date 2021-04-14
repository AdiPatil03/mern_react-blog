import React from 'react';

const Header = () => {
    return (
        <header className="blog-header py-3">
            <div className="row flex-nowrap justify-content-between align-items-center">
                <div className="col-12 text-center">
                    <a className="blog-header-logo text-dark" href="/">Aditya&rsquo;s Blogs</a>
                </div>
            </div>
        </header>
    );
};

export default Header;
