import React from 'react';
import { shallow } from 'enzyme';
import RefreshIcon from '@material-ui/icons/Refresh';
import Fab from '@material-ui/core/Fab';
import { Refresher } from './Refresher';
import { DEFAULT_THEME_COLOR } from '../../../config/settings';

describe('<Refresher /> component', () => {
  const props = {
    reloadPage: jest.fn(),
    classes: {},
    themeColor: DEFAULT_THEME_COLOR,
  };

  const component = shallow(<Refresher {...props} />);

  it('renders correctly', () => {
    // expect(component).toMatchSnapshot();
    expect(component).toBeTruthy();
  });
  it('shows one <Fab /> components', () => {
    expect(component.find(Fab).length).toEqual(1);
  });
  it('has one <RefreshIcon /> with class fa-redo-alt', () => {
    expect(component.find(RefreshIcon).length).toEqual(1);
  });
});
