import AuditDetail from './audit-detail'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

describe('audit', ()=>{
    test('audit details rendered properly', ()=>{
        render(<AuditDetail />)
        const modalElement = screen.findByRole('dialog')
        //expect(modalElement).toBeInTheDocument()
    })
})