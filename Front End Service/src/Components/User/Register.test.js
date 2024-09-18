import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Register from './Register';
import UserService from './UserService';
import { BrowserRouter, useNavigate } from 'react-router-dom';

// Mock the react-router-dom modules
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));
  

jest.mock('./UserService'); // Mock the UserService module

describe('Register Component', () => {
  test('renders Register component', () => {
    render(
        <BrowserRouter>
        <Register />
        </BrowserRouter>
        );
    const registerComponent = screen.getByTestId('register-component');
    expect(registerComponent).toBeInTheDocument();
  });

  it('form validation works', async () => {
    render(
        <BrowserRouter>
        <Register />
        </BrowserRouter>
        );
  
    // Fill out the form incorrectly
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), { target: { value: '123' } });
  
    // Get error messages using getByTestId or getByClassName (adjust according to your setup)
    const firstNameError = screen.getByTestId('first-name-error'); // Assuming you set a data-testid attribute
    const lastNameError = screen.getByTestId('last-name-error');
    const emailError = screen.getByTestId('email-error');
    const mobileNumberError = screen.getByTestId('mobile-number-error');
  
    // Assert that the error messages are displayed
    expect(firstNameError).toBeInTheDocument();
    expect(lastNameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(mobileNumberError).toBeInTheDocument();
    
    // ...assert other error messages or validation logic as needed
  });
  
  test('form validation passes with correct input', async () => {
    render(
        <BrowserRouter>
        <Register />
        </BrowserRouter>
        );
        const navigateMock = jest.fn();
        // Mocking the useNavigate hook
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigateMock);

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'valid@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByLabelText(/I agree all statements/i));

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Wait for validation to complete
    await waitFor(() => {
      // Assert no error messages are displayed
      expect(screen.queryByText(/First Name is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Last Name is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Invalid email address/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Enter valid Mobile Number/i)).not.toBeInTheDocument();
    });

    // Assert that navigate function is called
    expect(navigateMock).toHaveBeenCalledWith('/login');
    // You might need to mock UserService.registerUser to spy on its calls
    // For simplicity, we'll assume UserService.registerUser is correctly implemented
  });

  
  test('form validation passes with correct input and calls UserService.registerUser', async () => {
    // Mock the registerUser function from UserService
    UserService.registerUser.mockResolvedValueOnce({ data: { userId: 'mock-user-id' } });

    render(
        <BrowserRouter>
        <Register />
        </BrowserRouter>
        );

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'valid@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Strong@123' } });
    fireEvent.change(screen.getByLabelText(/Confirm password/i), { target: { value: 'Strong@123' } });
    fireEvent.click(screen.getByLabelText(/I agree all statements/i));

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Wait for validation to complete
    await waitFor(() => {
      // Assert no error messages are displayed
      expect(screen.queryByText(/First Name is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Last Name is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Invalid email address/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Enter valid Mobile Number/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Password should be minimum of 8 characters/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Passwords do not match/i)).not.toBeInTheDocument();
    });

    // Assert that registerUser function is called
    expect(UserService.registerUser).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '',
      emailId: 'valid@example.com',
      mobileNumber: '1234567890',
      password: 'Strong@123',
      confirmPassword: 'Strong@123',
      agreedToTerms: true
    });

    // Assert that navigate function is called
    expect(useNavigate).toHaveBeenCalledWith('/login');
  });
});
