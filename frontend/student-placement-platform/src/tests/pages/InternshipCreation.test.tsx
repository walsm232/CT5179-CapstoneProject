import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/vitest'
import '@testing-library/user-event'
import CreateInternship from '../../pages/InternshipCreation'

describe('InternshipCreation', () => {
    it('should test that page renders correctly', () => {
        render(<Router>
            <CreateInternship />
        </Router>);


    const jobTitleInput = screen.getByPlaceholderText('Job Title');
    expect(jobTitleInput).toBeInTheDocument();

    const locationInput = screen.getByPlaceholderText('Location');
    expect(locationInput).toBeInTheDocument();

    const durationInput = screen.getByPlaceholderText('Duration');
    expect(durationInput).toBeInTheDocument();

    const qualificationsInput = screen.getByPlaceholderText('Qualifications');
    expect(qualificationsInput).toBeInTheDocument();

    const descriptionInput = screen.getByPlaceholderText('Description');
    expect(descriptionInput).toBeInTheDocument();

    const date = screen.getByLabelText('Application Deadline');
    expect(date).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {name: 'Submit'});
    expect(submitButton).toBeInTheDocument();
    })
})