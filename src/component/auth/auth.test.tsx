import LoginForm from './login-form'
import LoginWithCredential from './Login-with-credential'
import RegisterForm from './register-form';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

describe('audit', ()=>{
    test('Auth component rendered properly', ()=>{
        render(<LoginForm />)
        const welcomStatement = screen.getByText('Welcome')
        expect(welcomStatement).toBeInTheDocument()

        const welcomeButton = screen.getByRole('button')
        expect(welcomeButton).toBeInTheDocument();

        const notOnboardedText = screen.getByText('Not on boarded yet?')
        expect(notOnboardedText).toBeInTheDocument()
        // const transactionMonitoring = screen.getByText('ATM & Transaction monitoring');
        // expect(transactionMonitoring).toBeInTheDocument()

    })

    test('LoginWithCredential component rendered properly', ()=> {
        render(<LoginWithCredential />)
        // const loginText = screen.getAllByText('Login')
        // expect(loginText).toBeInTheDocument()

        const emailInputElement = screen.getByRole('textbox');
        expect(emailInputElement).toBeInTheDocument();

        const passwordText = screen.getByText('Password');
        expect(passwordText).toBeInTheDocument();
    })

    test('RegisterForm component rendered properly', ()=> {
        render(<RegisterForm />)
        const registerText = screen.getByText('Register');
        expect(registerText).toBeInTheDocument();

        const textInputElement = screen.getByRole('textbox');
        expect(textInputElement).toBeInTheDocument();
    })
})