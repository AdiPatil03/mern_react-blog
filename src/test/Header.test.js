import React from 'react';
import {render, screen} from '@testing-library/react';
import Header from '../component/Header';

describe('Header component test suite: ', () => {
    it('should render Header', () => {
        render(<Header/>);
        let element = screen.getByText(content => content.startsWith('Aditya'));
        expect(element).toBeInTheDocument();
    });
});
