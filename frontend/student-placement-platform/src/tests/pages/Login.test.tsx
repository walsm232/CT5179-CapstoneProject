import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from '../../pages/Login';
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/vitest'
import '@testing-library/user-event'

describe('Login', () => {
    it('should render heading, login and sign up buttons', () => {
        render(<Router>
            <Login />
        </Router>);

    const heading = screen.getByRole('heading', {name: 'Login'});
    expect(heading).toBeInTheDocument();

    const loginButton = screen.getByRole('button', {name: 'Log In'});
    expect(loginButton).toBeInTheDocument();

    const signUpButtons = screen.getByRole('button', {name: 'Don\'t have an account? Sign Up'});
    expect(signUpButtons).toBeInTheDocument();

    const username = screen.getByRole('textbox');
    expect(username).toBeInTheDocument();
    })

    it('should test successful login form completion', () => {
        render(<Router>
            <Login />
        </Router>);

        const usernameInput = (screen.getByPlaceholderText('Username') as HTMLInputElement);
        const passwordInput = (screen.getByPlaceholderText('Password') as HTMLInputElement);

        const submitButton = screen.getByRole('button', {name: 'Log In'});
        fireEvent.change(usernameInput, { target: { value: 'kates' } });
        fireEvent.change(passwordInput, { target: { value: 'abcdef' } });
        fireEvent.click(submitButton);

        expect(usernameInput.value).toBe('kates');
        expect(passwordInput.value).toBe('abcdef');
        console.log('success');
    })

    })