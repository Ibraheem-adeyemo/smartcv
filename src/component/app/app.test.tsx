import AppCalendar from "./app-calendar";
import AppCard from "./app-card";
import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";

describe('AppCard', () => {
    it('Render app card correctly', ()=>{
        
        const wrapper = shallow(<AppCard topic={'testTopic'}>{null}</AppCard>);

        const wrapperText = wrapper.find('p').text()
        expect(wrapperText).toEqual('testTopic')
        
        //render(<AppCalendar />)
        //const element = screen.getByRole('button')
        //expect(element).toBeInTheDocument();
    })
})