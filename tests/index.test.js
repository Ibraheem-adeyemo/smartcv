import { render, screen } from '@testing-library/jest-dom'
import { Home } from '../pages/index';
import { CircularProgress } from '@chakra-ui/react';


describe('Render preloaded component', () => {
    render(<Home />)

    expect(screen.render(<CircularProgress />))
})