import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText('Test Button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>
    );
    
    fireEvent.click(getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button disabled onClick={handleClick}>Disabled Button</Button>
    );
    
    fireEvent.click(getByText('Disabled Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
}); 