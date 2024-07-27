import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/vitest'
import '@testing-library/user-event'
import CreateCompany from '../../pages/CreateCompany';

describe('CreateCompany', () => {
    it('should render form correctly', () => {
        render(<Router>
            <CreateCompany />
        </Router>);

    const heading = screen.getByRole('heading', {name: 'Create an Internship'});
    expect(heading).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText('Company Name');
    expect(nameInput).toBeInTheDocument();

    const locationInput = screen.getByPlaceholderText('Location');
    expect(locationInput).toBeInTheDocument();

    const industryInput = screen.getByPlaceholderText('Industry');
    expect(industryInput).toBeInTheDocument();

    const websiteInput = screen.getByPlaceholderText('Website');
    expect(websiteInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {name: 'Submit'});
    expect(submitButton).toBeInTheDocument();

    })
})