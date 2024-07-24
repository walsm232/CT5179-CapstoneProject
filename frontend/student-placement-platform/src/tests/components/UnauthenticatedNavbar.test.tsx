import { it, expect, describe } from 'vitest';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest'
import UnauthenticatedNavbar from '../../components/UnauthenticatedNavbar';

describe('NavBar', () => {
    it('should render login and register links', () => {
        render(<UnauthenticatedNavbar/>);

        const loginLink = screen.getByRole('link', {name: 'Login'});
        expect(loginLink).toBeInTheDocument();
        const registerLink = screen.getByRole('link', {name: 'Register'});
        expect(registerLink).toBeInTheDocument();
    })
})