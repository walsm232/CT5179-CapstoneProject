import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect, describe } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/vitest'
import '@testing-library/user-event'
import userEvent from '@testing-library/user-event';
import Register from '../../pages/Register'

describe('Register', () => {
    it('should successfully render register page', () => {
        render(<Router>
            <Register />
        </Router>);

        const heading = screen.getByRole('heading', {name: 'Register'});
        expect(heading).toBeInTheDocument();

        const registerbutton = screen.getByRole('button', {name: 'Sign Up'});
        expect(registerbutton).toBeInTheDocument();

        const loginButtons = screen.getByRole('button', {name: 'Already have an account? Log in'});
        expect(loginButtons).toBeInTheDocument();

        const usernameInput = (screen.getByPlaceholderText('Username') as HTMLInputElement);
        expect(usernameInput).toBeInTheDocument();

        const firstNameInput = (screen.getByPlaceholderText('First Name') as HTMLInputElement);
        expect(firstNameInput).toBeInTheDocument();

        const lastNameInput = (screen.getByPlaceholderText('Last Name') as HTMLInputElement);
        expect(lastNameInput).toBeInTheDocument();

        const emailInput = (screen.getByPlaceholderText('Email') as HTMLInputElement);
        expect(emailInput).toBeInTheDocument();

        const passwordInput = (screen.getByPlaceholderText('Password') as HTMLInputElement);
        expect(passwordInput).toBeInTheDocument();

        const confirmPasswordInput = (screen.getByPlaceholderText('Confirm Password') as HTMLInputElement);
        expect(confirmPasswordInput).toBeInTheDocument();

        const menu = screen.getAllByRole('option');
        expect(menu).not.toBeNull();

    })

    it('should test successful registeration form completion', () => {
        render(<Router>
            <Register />
        </Router>);

    const usernameInput = (screen.getByPlaceholderText('Username') as HTMLInputElement);
    const passwordInput = (screen.getByPlaceholderText('Password') as HTMLInputElement);
    const firstNameInput = (screen.getByPlaceholderText('First Name') as HTMLInputElement);
    const lastNameInput = (screen.getByPlaceholderText('Last Name') as HTMLInputElement);
    const emailInput = (screen.getByPlaceholderText('Email') as HTMLInputElement);
    const registerbutton = screen.getByRole('button', {name: 'Sign Up'});

    fireEvent.change(usernameInput, { target: { value: 'kates' } });
    fireEvent.change(passwordInput, { target: { value: 'abcdef' } });
    fireEvent.change(firstNameInput, { target: { value: 'Kate' } });
    fireEvent.change(lastNameInput, { target: { value: 'Sweeney' } });
    fireEvent.change(emailInput, { target: { value: 'x@y.z' } });
    fireEvent.click(registerbutton);

    expect(usernameInput.value).toBe('kates');
    expect(passwordInput.value).toBe('abcdef');
    expect(firstNameInput.value).toBe('Kate');
    expect(lastNameInput.value).toBe('Sweeney');
    expect(emailInput.value).toBe('x@y.z');
    console.log('success');
            
    })
})