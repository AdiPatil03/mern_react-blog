import React from 'react';
import {render, screen} from '@testing-library/react';
import {unmountComponentAtNode} from 'react-dom';
import Archive from '../component/Archive';

describe('Archive Component test suite: ', () => {
    it('should not render any posts if archive is empty', async() => {
        const match = {params: {}};
        render(
            <Archive currentUser='Adi' match={match}/>
        );
        expect(await screen.queryByText('July 1, 2017 by Adi')).toBeNull();
    });

    it('should render posts created on July 1, 2017', async() => {
        const match = {params: {archive: 'July 1, 2017'}};
        render(
            <Archive currentUser='Adi' match={match}/>
        );
        expect(await screen.findByText('July 1, 2017 by Adi')).toBeInTheDocument();
    });

    it('should not render any posts if created date does not match', async() => {
        const match = {params: {archive: 'July 1, 2018'}};
        render(
            <Archive currentUser='Adi' match={match}/>
        );
        expect(await screen.queryByText('July 1, 2018 by Adi')).toBeNull();
    });

    it('should show new posts when archive dates are changed', async() => {
        const match1 = {params: {archive: 'July 1, 2017'}};
        const match2 = {params: {archive: 'December 1, 2017'}};

        const {rerender} = render(
            <Archive currentUser='Adi' match={match1}/>
        );
        expect(await screen.findByText('July 1, 2017 by Adi')).toBeInTheDocument();

        rerender(
            <Archive currentUser='Adi' match={match2}/>
        );
        expect(await screen.findByText('December 1, 2017 by Adi')).toBeInTheDocument();
    });

    it('should show old posts if the new updated archive dates is empty', async() => {
        const match1 = {params: {archive: 'July 1, 2017'}};
        const match2 = {params: {}};

        const {rerender} = render(
            <Archive currentUser='Adi' match={match1}/>
        );
        expect(await screen.findByText('July 1, 2017 by Adi')).toBeInTheDocument();

        rerender(
            <Archive currentUser='Adi' match={match2}/>
        );
        expect(await screen.findByText('July 1, 2017 by Adi')).toBeInTheDocument();
    });

    it('should not try to set state of posts with new server details if the component is already unmounted', async() => {
        const match1 = {params: {archive: 'July 1, 2017'}};
        const match2 = {params: {archive: 'December 1, 2017'}};

        const {container, rerender} = render(
            <Archive currentUser='Adi' match={match1}/>
        );
        expect(await screen.findByText('July 1, 2017 by Adi')).toBeInTheDocument();

        unmountComponentAtNode(container);

        rerender(
            <Archive currentUser='Adi' match={match2}/>
        );
        expect(await screen.queryByText('July 1, 2017 by Adi')).toBeNull();
    });

});
