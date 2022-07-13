import { ArrowBack } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../DataProvider';

export default function RepoInfo() {
  const { repoId } = useParams<{ repoId: string }>();
  const { repos } = useData();
  const navigate = useNavigate();

  const repo = useMemo(() => {
    return repos.find((item) => item.id === parseInt(repoId as string, 10));
  }, [repoId, repos]);

  return (
    <Box>
      <Box>
        <Typography variant="h4" marginY={4}>
          <IconButton>
            <ArrowBack onClick={() => navigate(-1)} />
          </IconButton>
          RepositoryInfo
        </Typography>
      </Box>
      <Box display={'flex'} alignItems="flex-end">
        <Typography variant="h6">Name :</Typography>{' '}
        <Typography marginLeft={3}>{repo?.name}</Typography>
      </Box>
      {repo?.latest_commit && (
        <>
          <Typography marginTop={4} variant="h5">
            Recent Commit Info:
          </Typography>
          <Box display={'flex'} alignItems="flex-end">
            <Typography variant="h6"> Author :</Typography>{' '}
            <Typography marginLeft={3}>
              {repo?.latest_commit?.author?.name}
            </Typography>
          </Box>
          <Box display={'flex'} alignItems="flex-end">
            <Typography variant="h6"> Message :</Typography>{' '}
            <Typography marginLeft={3}>
              {repo?.latest_commit?.message}
            </Typography>
          </Box>
          <Box display={'flex'} alignItems="flex-end">
            <Typography variant="h6"> Date :</Typography>{' '}
            <Typography marginLeft={3}>
              {repo?.latest_commit?.author.date}
            </Typography>
          </Box>
        </>
      )}
      {repo?.markdown && (
        <>
          <Typography marginTop={4} variant="h5">
            Repo Markdown Content:
          </Typography>
          <ReactMarkdown children={repo?.markdown} />
        </>
      )}
    </Box>
  );
}
