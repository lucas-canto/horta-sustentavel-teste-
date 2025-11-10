import { describe, it, expect, vi } from 'vitest';
import { PostAuth } from '../PostAuth';
import { api } from '@/lib/axios';

// Mock the api module
vi.mock('@/lib/axios');

describe('PostAuth', () => {
  it('should return data on successful API call', async () => {
    const mockResponse = {
      status: 'sucesso',
      mensagem: 'Autenticado com sucesso',
      id_produtor: 123,
      expira_em: '2025-12-31 23:59:59',
    };

    // Mock the post method to resolve with our mock response
    vi.mocked(api.post).mockResolvedValue({ data: mockResponse });

    const authData = {
      token: 'fake-token',
      data_atual: new Date().toISOString(),
    };

    const result = await PostAuth(authData);

    expect(result).toEqual(mockResponse);
    expect(api.post).toHaveBeenCalledWith('/auth.php', authData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should throw an error on failed API call', async () => {
    const mockError = new Error('Network Error');

    // Mock the post method to reject with an error
    vi.mocked(api.post).mockRejectedValue(mockError);

    const authData = {
      token: 'fake-token',
      data_atual: new Date().toISOString(),
    };

    // We expect the function to throw an error, so we wrap it in a try/catch
    // or use .rejects for promise-based functions.
    await expect(PostAuth(authData)).rejects.toThrow('Network Error');
  });
});
