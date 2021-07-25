import { Box } from 'grommet';

const AnimatedBox = (props: any) => {
  return (
    <Box
      animation={[
        { type: 'fadeIn', duration: 200 },
        { type: 'slideUp', duration: 200 },
      ]}
      {...props}
    >
      {props.children}
    </Box>
  );
};

export default AnimatedBox;
