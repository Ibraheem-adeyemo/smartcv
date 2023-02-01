import React from 'react';
import { IssuingTranValueChart, IssuingTranVolumeChart } from './IssuingAtmTransactionVolumeCount'
import { FailedAndSuccessfulChart } from './'
import { render, screen } from '@testing-library/react';
import { shallow, configure, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom'

configure({adapter: new Adapter()})

const { ResizeObserver } = window;

global.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    }))

describe('IssuingTransactionValueChart', ()=>{
    const wrapper = shallow(<IssuingTranValueChart />)
    it('should match the snapshot', ()=>{
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('IssuingTranValueChart component rendered properly', ()=>{
        render(<IssuingTranValueChart />)
        const welcomStatement = screen.getByText(/breakdown of issuing/, {exact: false})
        expect(welcomStatement).toBeInTheDocument()
    })    

    test('IssuingTranVolumeChart component rendered properly', ()=> {
        render(<IssuingTranVolumeChart />)
        const activeCardChart = screen.getByText(/count of active cards/, {exact: false})
        expect(activeCardChart).toBeInTheDocument()
    });
})

describe('IssuingTranVolumeChart', ()=>{
    it('IssuingTranVolumeChart component rendered properly', ()=>{
        const wrapper = shallow(<IssuingTranVolumeChart />)
        // const wrapperContext = wrapper.context();
        const text = wrapper.find('.text').text()
        expect(text).toEqual(' count of active cards')
    })
})

describe('FailedAndSuccessfulChart', ()=>{

    
    beforeEach(() =>{
        //delete window?.ResizeObserver;
        // const wrapper = mount(<FailedAndSuccessfulChart />)
    })


    it('should match the snapshot', ()=>{
        const tree = renderer.create(<FailedAndSuccessfulChart />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('Displays Total transaction', ()=>{
        const wrapper = shallow(<FailedAndSuccessfulChart />).dive();
        const originalContext = React.useContext;
        const mockReactUseContext = jest.fn().mockReturnValue('daily')
        React.useContext = mockReactUseContext
        const text = wrapper.find('.totalTrans').text()
        expect(text).toEqual('Total  transaction')
    })

    it('display failed transaction', ()=>{
        const wrapper = shallow(<FailedAndSuccessfulChart />)
        const text = wrapper.find('.failedTransaction').text()
        expect(text).toEqual('Failed transaction')
    })

    it('display success transaction', ()=>{
        const wrapper = shallow(<FailedAndSuccessfulChart />)
        const text = wrapper.find('.successTransaction').text()
        expect(text).toEqual('Successful transaction')
    })
})