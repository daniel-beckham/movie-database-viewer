import { Box, Text } from 'grommet';
import { Github } from 'grommet-icons';

const Footer = () => {
  return (
    <Box
      align="center"
      className="footer"
      direction="row"
      gap="small"
      justify="center"
      pad="medium"
    >
      <Text size="small">
        &copy; {new Date().getFullYear()} Movie Database Viewer
      </Text>
      <a href="https://github.com/daniel-beckham/movie-database-viewer">
        <Github size="small" />
      </a>
    </Box>
  );
};

export default Footer;
