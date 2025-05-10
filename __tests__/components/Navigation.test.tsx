import { render, screen, fireEvent } from '@testing-library/react'
import Navigation from '@/components/Navigation'

describe('Navigation', () => {
  it('renders navigation links', () => {
    render(<Navigation />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Compare')).toBeInTheDocument()
  })

  it('renders authentication buttons when not logged in', () => {
    render(<Navigation />)
    
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })

  it('toggles theme when theme button is clicked', () => {
    render(<Navigation />)
    
    const themeButton = screen.getByRole('button', { name: /dark mode/i })
    fireEvent.click(themeButton)
    
    expect(document.documentElement).toHaveClass('dark')
  })
}) 