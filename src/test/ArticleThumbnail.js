import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {jest} from '@jest/globals';
import {render, screen, fireEvent} from '@testing-library/react';
import ArticleThumbnail from '../component/ArticleThumbnail';

describe('ArticleThumbnail component test suite: ', () => {
    let article;
    beforeEach(() => {
        article = {
            title:     'My first post', // eslint-disable-next-line
            body:      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, ',
            author:    'Adi',
            slug:      'my-first-post',
            tags:      ['aurelia', 'lorem', 'javascript'],
            createdAt: 'July 1, 2017'
        };
    });

    it('should not render anything if article prop is empty', () => {
        let article1 = {};
        render(
            <Router>
                <ArticleThumbnail thumbnail={true} article={article1} />
            </Router>
        );
        expect(screen.queryByRole('p')).toBeNull();
    });

    it('should render Title link if thumbnail is set true', () => {
        render(
            <Router>
                <ArticleThumbnail thumbnail={true} article={article} />
            </Router>
        );
        expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should not render Title link if thumbnail is set false', () => {
        const {container} = render(
            <Router>
                <ArticleThumbnail thumbnail={false} article={article}/>
            </Router>
        );
        expect(container.querySelector('a')).toBeNull();
    });

    it('should render Edit button if thumbnail is set false and user is same as author', () => {
        render(
            <Router>
                <ArticleThumbnail thumbnail={false} article={article} user='Adi'/>
            </Router>
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText(content => content.startsWith('Edit Article'))).toBeInTheDocument();
    });

    it('should not render Edit button if user is different from author', () => {
        const {container} = render(
            <Router>
                <ArticleThumbnail article={article} user='DJ'/>
            </Router>
        );
        expect(container.querySelector('button')).toBeNull();
    });

    it('should call props function on Edit Article button click', () => {
        const handleClick = jest.fn();
        render(
            <Router>
                <ArticleThumbnail thumbnail={false} article={article} user='Adi' setEdit={handleClick}/>
            </Router>
        );
        fireEvent.click(screen.getByText(/Edit Article/i));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

});
