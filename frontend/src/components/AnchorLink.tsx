import { useHistory } from 'react-router-dom';

import { Anchor } from 'grommet';

const AnchorLink = (props: any) => {
  const history = useHistory();

  return (
    <Anchor
      href={props.url}
      onClick={(event: any) => {
        event.preventDefault();
        history.push(props.url);
      }}
      {...props}
    />
  );
}

export default AnchorLink;
