import { render, screen } from '@testing-library/react';
import { Button } from '../button';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
  it('should render correctly with default props', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    // Default variant is 'default', default size is 'default'
    expect(buttonElement).toHaveClass('bg-primary text-primary-foreground');
    expect(buttonElement).toHaveClass('h-10 px-4 py-2');
  });

  it('should apply the correct classes for the "destructive" variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    const buttonElement = screen.getByRole('button', { name: /delete/i });
    expect(buttonElement).toHaveClass('bg-destructive text-destructive-foreground');
  });

  it('should apply the correct classes for the "sm" size', () => {
    render(<Button size="sm">Small</Button>);
    const buttonElement = screen.getByRole('button', { name: /small/i });
    expect(buttonElement).toHaveClass('h-9 rounded-md px-3');
  });

  it('should render as a different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/">Link</a>
      </Button>
    );
    // It should now be a link, not a button
    const linkElement = screen.getByRole('link', { name: /link/i });
    expect(linkElement).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
