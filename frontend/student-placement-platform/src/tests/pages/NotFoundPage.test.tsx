import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import NotFoundPage from '../../pages/NotFound'

import '@testing-library/jest-dom/vitest'

describe('NotFound', () => {
    it('should render error message', () => {
          render(
        <Router>
            <NotFoundPage />
        </Router>
    )

    const errorMessage = screen.getByText(/Oops 404!/i);
    expect(errorMessage).toBeInTheDocument();
    })
})