import React from 'react';
import {render, screen} from '@testing-library/react';
import {unmountComponentAtNode} from 'react-dom';
import Tag from '../component/Tag';

describe('Tag Component test suite: ', () => {
    it('should not render any posts if tags is empty', async() => {
        const match = {params: {}};
        render(
            <Tag user='Adi' match={match}/>
        );
        expect(await screen.queryByText('aurelia')).toBeNull();
    });

    it('should display posts tagged with aurelia name', async() => {
        const match = {params: {tag: 'aurelia'}};
        render(
            <Tag user='Adi' match={match}/>
        );
        expect(await screen.findByText('aurelia')).toBeInTheDocument();
    });

    it('should not display posts if wrong tag is passed', async() => {
        const match = {params: {tag: 'abcd'}};
        render(
            <Tag user='Adi' match={match}/>
        );
        expect(await screen.queryByText('abcd')).toBeNull();
    });

    it('should show new posts when tag selection is changed', async() => {
        const match1 = {params: {tag: 'aurelia'}};
        const match2 = {params: {tag: 'javascript'}};

        const {rerender} = render(
            <Tag user='Adi' match={match1}/>
        );
        expect(await screen.findByText('aurelia')).toBeInTheDocument();

        rerender(
            <Tag user='Adi' match={match2}/>
        );
        expect(await screen.findByText('javascript')).toBeInTheDocument();
    });

    it('should show old posts if the new updated tag selection is empty', async() => {
        const match1 = {params: {tag: 'aurelia'}};
        const match2 = {params: {}};

        const {rerender} = render(
            <Tag user='Adi' match={match1}/>
        );
        expect(await screen.findByText('aurelia')).toBeInTheDocument();

        rerender(
            <Tag user='Adi' match={match2}/>
        );
        expect(await screen.findByText('aurelia')).toBeInTheDocument();
    });

    it('should not try to set state of posts with new server details if the component is already unmounted', async() => {
        const match1 = {params: {tag: 'aurelia'}};
        const match2 = {params: {tag: 'javascript'}};

        const {container, rerender} = render(
            <Tag user='Adi' match={match1}/>
        );
        expect(await screen.findByText('aurelia')).toBeInTheDocument();

        unmountComponentAtNode(container);

        rerender(
            <Tag user='Adi' match={match2}/>
        );
        expect(await screen.queryByText('javascript')).toBeNull();
    });

});
