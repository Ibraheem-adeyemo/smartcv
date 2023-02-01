import AppTableFooter from "./app-table-footer";
import AppCard from "./app-card";
import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";

describe('AppTableFooter', () => {
    it('Render AppTableFooter correctly', ()=>{
        const context = { pageNumber:2,
            totalPageNumber:3,
            incrementPageNumber:jest.fn(),
            decrementPageNumber:jest.fn()}
        const wrapper = shallow(<AppTableFooter />, { context })
        const linkComp = wrapper.setContext({totalPageNumber:3})
                
        //render(<AppCalendar />)
        //const element = screen.getByRole('button')
        //expect(element).toBeInTheDocument();
    })
})