import { it, expect, describe } from 'vitest';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest'
import Homepage from '../../pages/HomePage';
import { BrowserRouter as Router } from 'react-router-dom'

describe('HomePage', () => {
    it('should render login and register links', () => {
        render(<Router>
            <Homepage />
        </Router>);

        const loginLink = screen.getByRole('link', {name: 'Login'});
        expect(loginLink).toBeInTheDocument();
        const registerLink = screen.getByRole('link', {name: 'Register'});
        expect(registerLink).toBeInTheDocument();
    })
})