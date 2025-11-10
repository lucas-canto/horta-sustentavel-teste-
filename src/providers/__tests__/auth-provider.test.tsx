import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider } from '../auth-provider';
import { AuthContext } from '@/context/auth-context';
import * as PostAuthService from '@/service/PostAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContext } from 'react';

// Mock the PostAuth service
vi.mock('@/service/PostAuth');

// A simple component to consume and display the auth context
const TestConsumer = () => {
  const { userId, token } = useContext(AuthContext);
  return (
    <div>
      <span>User ID: {userId || 'null'}</span>
      <span>Token: {token || 'null'}</span>
    </div>
  );
};

// A wrapper to render the provider with a fresh query client for each test
const renderAuthProvider = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    </QueryClientProvider>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    // Reset mocks and localStorage before each test
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('should automatically log in if a valid token is in localStorage', async () => {
    const mockToken = 'valid-token';
    const mockUserId = 456;
    localStorage.setItem('jwtToken', mockToken);

    vi.spyOn(PostAuthService, 'PostAuth').mockResolvedValue({
      status: 'sucesso',
      id_produtor: mockUserId,
    } as any);

    renderAuthProvider();

    // Wait for the useEffect and mutateAsync to complete
    await waitFor(() => {
      expect(screen.getByText(`User ID: ${mockUserId}`)).toBeInTheDocument();
    });
    expect(screen.getByText(`Token: ${mockToken}`)).toBeInTheDocument();
  });

  it('should handle automatic login failure if token is invalid', async () => {
    localStorage.setItem('jwtToken', 'invalid-token');

    vi.spyOn(PostAuthService, 'PostAuth').mockResolvedValue({
      status: 'erro',
    } as any);

    renderAuthProvider();

    await waitFor(() => {
      expect(screen.getByText('User ID: null')).toBeInTheDocument();
    });
  });

  it('should allow a user to log in and update context', async () => {
    const queryClient = new QueryClient();
    let authContextValue: any;

    const LoginComponent = () => {
      authContextValue = useContext(AuthContext);
      return <TestConsumer />;
    };

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LoginComponent />
        </AuthProvider>
      </QueryClientProvider>
    );

    // Initial state
    expect(screen.getByText('User ID: null')).toBeInTheDocument();

    // Mock the mutation that will be called by login
    vi.spyOn(PostAuthService, 'PostAuth').mockResolvedValue({
      status: 'sucesso',
      id_produtor: 789,
    } as any);

    // Call the login function from the captured context
    await act(async () => {
      await authContextValue.login(789, 'new-login-token');
    });

    await waitFor(() => {
      expect(screen.getByText('User ID: 789')).toBeInTheDocument();
      expect(localStorage.getItem('userID')).toBe('789');
      expect(localStorage.getItem('jwtToken')).toBe('new-login-token');
    });
  });

  it('should allow a user to log out and clear context', async () => {
    const queryClient = new QueryClient();
    let authContextValue: any;

    const TestComponent = () => {
      authContextValue = useContext(AuthContext);
      return <TestConsumer />;
    };

    // Set up initial logged-in state in localStorage
    localStorage.setItem('jwtToken', 'some-token');
    localStorage.setItem('userID', '123');
    vi.spyOn(PostAuthService, 'PostAuth').mockResolvedValue({
        status: 'sucesso',
        id_produtor: 123,
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </QueryClientProvider>
    );

    // Wait for the initial auto-login to complete
    await waitFor(() => {
        expect(screen.getByText('User ID: 123')).toBeInTheDocument();
    });

    // Now, call logout
    await act(async () => {
        await authContextValue.logout();
    });

    // Check if the state has been cleared
    await waitFor(() => {
      expect(screen.getByText('User ID: null')).toBeInTheDocument();
      expect(localStorage.getItem('userID')).toBeNull();
      expect(localStorage.getItem('jwtToken')).toBeNull();
    });
  });
});
