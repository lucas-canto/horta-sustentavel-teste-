import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../Navigation';
import { describe, it, expect, vi } from 'vitest';
import { AuthProvider } from '@/providers/auth-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Auth from '@/hooks/use-auth';

vi.mock('@/hooks/use-auth');

describe('Navigation', () => {
  const queryClient = new QueryClient();

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
  };

  it('should render all navigation links and login button when logged out', () => {
    vi.spyOn(Auth, 'useAuth').mockReturnValue({ userId: null } as any);
    renderComponent();

    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Mapa das Hortas')).toBeInTheDocument();
    expect(screen.getByText('Receitas')).toBeInTheDocument();
    expect(screen.getByText('Calendario verde')).toBeInTheDocument();
    expect(screen.getByText('Guia do cultivo')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /entrar/i })).toBeInTheDocument();
  });

  it('should render user profile link when logged in', () => {
    vi.spyOn(Auth, 'useAuth').mockReturnValue({ userId: '123' } as any);
    renderComponent();

    expect(screen.queryByRole('link', { name: /entrar/i })).not.toBeInTheDocument();
    // Check for the link that goes to the producer page
    expect(screen.getByRole('link', { name: '' })).toHaveAttribute('href', '/producer');
  });

  it('should toggle mobile menu on button click', () => {
    vi.spyOn(Auth, 'useAuth').mockReturnValue({ userId: null } as any);
    renderComponent();

    const mobileMenuButton = screen.getByRole('button', { name: '' });
    fireEvent.click(mobileMenuButton);

    // After click, the mobile nav should be visible with all links
    const mobileNav = screen.getByRole('navigation');
    expect(mobileNav).toBeVisible();
    expect(mobileNav).toHaveTextContent(/início/i);
    expect(mobileNav).toHaveTextContent(/mapa das hortas/i);
  });
});
