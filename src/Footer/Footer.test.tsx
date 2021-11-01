import React from 'react';
import { render, getByLabelText } from '@testing-library/react';
import Footer from './Footer';

test('renders the Footer', () => {
    const { getByText } = render(<Footer />);
    const linkElement = getByText('Versandkosten');
  expect(linkElement).toBeInTheDocument();
});
