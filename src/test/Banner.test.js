import React from 'react';
import {render, screen} from '@testing-library/react';
import Banner from '../component/BAnner';

describe('Banner component test suite: ', () => {
    it('should not render anything if banner prop is empty', () => {
        const banner = {};
        render(<Banner banner={banner} />);
        const element = screen.queryByRole('alert');
        expect(element).not.toBeInTheDocument();
    });

    it('should render the banner message with danger style, if passed banner prop type is danger', () => {
        const banner = {type: 'danger', message: 'This is an Error Component'};
        const {container} = render(<Banner banner={banner} />);
        expect(screen.getByText('This is an Error Component')).toBeInTheDocument();
        expect(container.firstChild).toHaveClass('alert-danger');
    });

    it('should render the banner message with info style, if passed banner prop type is info', () => {
        const banner = {type: 'info', message: 'This is an Info Component'};
        const {container} = render(<Banner banner={banner} />);
        expect(screen.getByText('This is an Info Component')).toBeInTheDocument();
        expect(container.firstChild).toHaveClass('alert-info');
    });

});
