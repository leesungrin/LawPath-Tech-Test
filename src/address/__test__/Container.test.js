
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { render, getByText } from '@testing-library/react';
import Container from '../Container';

test('renders Container without crashing', () => {
  render(<Container />);
});

test('test for loading app bar', () => {
   const { getByTestId } = render(<Container />);
   const toolbarElem = getByTestId('appBar');
   expect(toolbarElem).toBeInTheDocument();
});

test('test for title', () => {
    const { getByTestId } = render(<Container />);
    const headingElem = getByTestId('title');
    expect(headingElem).toBeInTheDocument();
 });