import { Alert, CircularProgress, Grid } from '@mui/material';
import { useData } from './DataProvider';
import RepoList from './Components/RepoList';
import { Box, Container } from '@mui/system';

export function App() {
  const { status, repos } = useData();

  if (status === 'FETCHING') {
    return (
      <Box
        width={'100vw'}
        height={'100vh'}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Container>
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={12} justifyContent="center" alignItems="center">
          {status === 'FETCH_FAILED' && (
            <Alert severity="error">
              Error: Please Refresh Page or Contact Support
            </Alert>
          )}
          {status === 'FETCH_SUCCESS' && <RepoList repos={repos} />}
        </Grid>
      </Grid>
    </Container>
  );
}
