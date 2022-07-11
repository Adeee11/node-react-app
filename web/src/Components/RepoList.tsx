import { Box, Typography } from '@mui/material';
import { IRepository } from '../types';

export default function RepoList(props: { repos: IRepository[] }) {
  return (
    <Box>
      <Typography variant="h4" marginTop={4}>
        List of Repositories
      </Typography>
    </Box>
  );
}
