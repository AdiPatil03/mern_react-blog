import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {jest} from '@jest/globals';
import {render, screen, fireEvent} from '@testing-library/react';
import PostThumbnail from '../component/PostThumbnail';

describe('PostThumbnail component test suite: ', () => {
    let post;
    beforeEach(() => {
        post = {
            title:     'My first post', // eslint-disable-next-line
            body:      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, ',
            author:    'Adi',
            slug:      'my-first-post',
            tags:      ['aurelia', 'lorem', 'javascript'],
            createdAt: 'July 1, 2017'
        };
    });

    it('should not render anything if post prop is empty', () => {
        let post1 = {};
        render(
            <Router>
                <PostThumbnail thumbnail={true} post={post1} />
            </Router>
        );
        expect(screen.queryByRole('p')).toBeNull();
    });

    it('should render Title link if thumbnail is set true', () => {
        render(
            <Router>
                <PostThumbnail thumbnail={true} post={post} />
            </Router>
        );
        expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should not render Title link if thumbnail is set false', () => {
        const {container} = render(
            <Router>
                <PostThumbnail thumbnail={false} post={post}/>
            </Router>
        );
        expect(container.querySelector('a')).toBeNull();
    });

    it('should render Edit button if thumbnail is set false and currentUser is same as author', () => {
        render(
            <Router>
                <PostThumbnail thumbnail={false} post={post} currentUser='Adi'/>
            </Router>
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText(content => content.startsWith('Edit Post'))).toBeInTheDocument();
    });

    it('should not render Edit button if currentUser is different from author', () => {
        const {container} = render(
            <Router>
                <PostThumbnail post={post} currentUser='DJ'/>
            </Router>
        );
        expect(container.querySelector('button')).toBeNull();
    });

    it('should call props function on Edit Post button click', () => {
        const handleClick = jest.fn();
        render(
            <Router>
                <PostThumbnail thumbnail={false} post={post} currentUser='Adi' setEdit={handleClick}/>
            </Router>
        );
        fireEvent.click(screen.getByText(/Edit Post/i));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

});
