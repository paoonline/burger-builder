import React from 'react'
import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>)
    })
    it('should render two <NavagationItems/> ele if not authen', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should render Three <NavagationItem/> ele if authen', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('should an exact Orders button', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link="/orders">Orders</NavigationItem>)).toEqual(true)
    })

    it('should an exact logout button', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })
})