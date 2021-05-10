import { render } from '@testing-library/react';
import AddressForm from '../AddressForm';

test('renders AddressForm without crashing', () => {
  render(<AddressForm />);
});

test('test for address form fields', () => {
    const { getByTestId } = render(<AddressForm />);

    const address1Elem = getByTestId('address1');
    const address2Elem = getByTestId('address2');
    const stateElem = getByTestId('state');
    const suburbElem = getByTestId('suburb');
    const postcodeElem = getByTestId('postcode');

    expect(address1Elem).toBeInTheDocument();
    expect(address2Elem).toBeInTheDocument();
    expect(stateElem).toBeInTheDocument();
    expect(suburbElem).toBeInTheDocument();
    expect(postcodeElem).toBeInTheDocument();
 });

test('test for heading', () => {
    const { getByTestId } = render(<AddressForm />);
    const headingElem = getByTestId('heading');
    expect(headingElem).toBeInTheDocument();
 });

test('test for form container', () => {
    const { getByTestId } = render(<AddressForm />);
    const formContainerElem = getByTestId('formContainer');
    expect(formContainerElem).toBeInTheDocument();
 });

test('test for button container', () => {
    const { getByTestId } = render(<AddressForm />);
    const buttonContainerElem = getByTestId('buttonContainer');
    expect(buttonContainerElem).toBeInTheDocument();
 });