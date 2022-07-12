import { ArrowBack } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';

export default function RepoInfo() {
  const { repoId } = useParams<{ repoId: string }>();
  const navigate = useNavigate();
  //   const {} = useRoutes()
  return (
    <Box>
      <Box>
        <Typography variant="h4" marginTop={4}>
          <IconButton>
            <ArrowBack onClick={() => navigate(-1)} />
          </IconButton>
          RepositoryInfo
        </Typography>
      </Box>
      {repoId}
    </Box>
  );
}
