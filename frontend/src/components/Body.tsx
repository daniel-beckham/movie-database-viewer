import { Box } from 'grommet';

import Routes from 'components/Routes';
import Search from 'components/Search';

const Body = () => {
  return (
    <Box className="body" pad="medium">
      <Box alignSelf="center" width="xlarge">
        <Search />
        <Routes />
      </Box>
    </Box>
  );
};

export default Body;
