import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import Login from './Login';
import UserService from './UserService'; // Import your service functions for mocking

// Mock the react-router-dom modules
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('./UserService'); // Mock the UserService module

describe('Login Component', () => {
  it('renders login form correctly', () => {
    render(
        <BrowserRouter>
        <Login />
        </BrowserRouter>
        );
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account??/i)).toBeInTheDocument();
  });

  // ... imports and setup

it('validates email and password fields', async () => {
    render(
        <BrowserRouter>
        <Login />
        </BrowserRouter>
        );
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
  
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
  
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));
  
    // Wait for the form or a containing element to be in the document
    await waitFor(() => {
      expect(screen.getByTestId('login-form')).toBeInTheDocument(); // adjust 'login-form' to an appropriate data-testid
    });
  
    // Assert the text within the form
    expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });
  

  it('submits the form with valid credentials', async () => {
    render(
        <BrowserRouter>
        <Login />
        </BrowserRouter>
        );
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.change(emailInput, { target: { value: 'newemail45@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mohan@123' } });

    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    // Assuming your UserService.loginUser function returns a successful response
    UserService.loginUser.mockResolvedValueOnce({ data: { token: 'mock-token', user: 'mock-user-id' } });

    // Wait for async actions to complete
    await waitFor(() => {
      // You can test if a redirection happens or any other UI changes after successful login
      // For example:
      expect(window.location.pathname).toBe('/');
    });
  });
});
