import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter as Router } from 'react-router-dom'

// To Test
import App from './App'

// Tests
describe('Renders App correctly', async () => {
  it('Should render App', async () => {
    // Setup
    const { container } = render(<Router><App /></Router>)

    // exist elements
    expect(container).toBeInTheDocument()
  })
})
