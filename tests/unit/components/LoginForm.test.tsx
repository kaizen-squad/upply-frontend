import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import LoginForm from '@/app/(auth)/login/page';

const { loginMock, notifyMock } = vi.hoisted(() => ({
  loginMock: vi.fn(),
  notifyMock: vi.fn(),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({ login: loginMock, loading: false }),
}));

vi.mock('@/components/ui/Toast/useToasting', () => ({
  useToasting: () => ({ notify: notifyMock }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    loginMock.mockReset();
    notifyMock.mockReset();
  });

  it('shows validation errors and does not submit invalid credentials', async () => {
    render(<LoginForm />);
    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');

    fireEvent.change(email, { target: { value: 'not-an-email' } });
    fireEvent.change(password, { target: { value: 'short' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Sign In' }).closest('form')!);

    await waitFor(() => {
      expect(email.getAttribute('aria-invalid')).toBe('true');
      expect(password.getAttribute('aria-invalid')).toBe('true');
    });
    expect(loginMock).not.toHaveBeenCalled();
  });

  it('submits valid credentials to the authentication action', async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@example.test' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'valid-password' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Sign In' }).closest('form')!);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({ email: 'user@example.test', password: 'valid-password' });
    });
  });
});
