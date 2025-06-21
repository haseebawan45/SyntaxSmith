import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the components to avoid errors
vi.mock('./components/layout/Header', () => ({
  default: () => <div data-testid="header">Header</div>
}));

vi.mock('./components/layout/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>
}));

vi.mock('./components/home/Home', () => ({
  default: () => <div data-testid="home">Home</div>
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('home')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
