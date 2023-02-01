import MissionStatement from './MissionStatement'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

describe('audit', ()=>{
    test('MissionStatement rendered properly', ()=>{
        render(<MissionStatement />)
        const modalElement = screen.getByText('Card operation')
        expect(modalElement).toBeInTheDocument()

        const transactionMonitoring = screen.getByText('ATM & Transaction monitoring');
        expect(transactionMonitoring).toBeInTheDocument()

    })
})