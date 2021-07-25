import { BrowserRouter as Router } from 'react-router-dom';

import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

import Body from 'components/Body';
import Footer from 'components/Footer';
import Header from 'components/Header';

const theme = deepMerge(grommet, {
  global: {
    colors: {
      brand: 'neutral-3',
      focus: 'neutral-3-dark',
      selected: 'neutral-3-dark',
      'neutral-3-dark': '#00394e',
    },
    input: {
      font: {
        weight: 500,
      },
    },
  },
  anchor: {
    extend: `
    &:hover:not(:focus-visible),
    &:focus:not(:focus-visible) {
      box-shadow: none;outline: none;
    }`,
  },
  table: {
    body: {
      pad: { vertical: 'xxsmall' },
    },
  },
});

const App = () => {
  return (
    <Router>
      <Grommet className="main" full={'min'} theme={theme}>
        <Header />
        <Body />
        <Footer />
      </Grommet>
    </Router>
  );
};

export default App;
